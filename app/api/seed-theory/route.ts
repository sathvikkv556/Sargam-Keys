import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import Note from '@/models/Note';
import { lessons } from '@/lib/music-theory-data';
import { slugify } from '@/lib/utils';

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const results = [];
    const lessonEntries = Object.entries(lessons);

    for (const [slug, data] of lessonEntries) {
      // Find or create the note
      // We use the slug as a way to identify the note, but the Note model doesn't have a slug field.
      // We'll match by title and category.
      
      const noteData = {
        title: data.title,
        description: data.goal,
        content: JSON.stringify(data.content), // Store structured content as JSON
        category: 'music-theory',
        difficulty: 'beginner', // Default, we could map this if we had it in the data
      };

      // Set difficulty based on some keywords or just leave as beginner for now
      if (slug.includes('advanced') || slug.includes('improv') || slug.includes('cheat')) {
        noteData.difficulty = 'advanced';
      } else if (slug.includes('minor') || slug.includes('chord') || slug.includes('modes')) {
        noteData.difficulty = 'intermediate';
      }

      const updatedNote = await Note.findOneAndUpdate(
        { title: data.title, category: 'music-theory' },
        noteData,
        { upsert: true, new: true }
      );

      results.push({
        id: updatedNote._id,
        title: updatedNote.title,
        status: 'Synced'
      });
    }

    return NextResponse.json({
      message: 'Music Theory data seeded successfully!',
      count: results.length,
      results
    });
  } catch (error: any) {
    console.error('Seeding error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
