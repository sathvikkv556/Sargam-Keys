import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import NoteModel from '@/models/Note';
import { Note as NoteType } from '@/types';

/**
 * GET /api/notes
 * Fetch all notes with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const skip = (page - 1) * limit;

    // Build filter
    const filter: any = {};
    if (category) filter.category = category;
    if (difficulty) filter.difficulty = difficulty;

    // Fetch notes
    const notes = await NoteModel.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .lean();

    // Get total count
    const total = await NoteModel.countDocuments(filter);

    return NextResponse.json(
      {
        success: true,
        data: notes,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching notes:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch notes',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/notes
 * Create a new note
 */
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body: NoteType = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.content || !body.category) {
      return NextResponse.json(
        {
          success: false,
          error: 'Missing required fields: title, description, content, category',
        },
        { status: 400 }
      );
    }

    // Create note
    const note = await NoteModel.create(body);

    return NextResponse.json(
      {
        success: true,
        data: note,
        message: 'Note created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating note:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create note',
      },
      { status: 500 }
    );
  }
}
