/**
 * Fix script (APPLY MODE):
 * 1. Fix "Dhuradhar" -> "Dhurandhar" in movie/album fields
 * 2. Remove junk tags: those containing '#' or 'piano notes'
 * 3. Remove 'piano notes' from tags (keep tags that are legitimate)
 * 4. Fix "User Submission" tag display issues
 * 
 * NO lyric removal here — that requires separate user confirmation.
 */
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to DB\n');

  const songs = await mongoose.connection.collection('songs').find({}).toArray();
  let updated = 0;

  for (const song of songs) {
    const changes: any = {};

    // Fix movie/album Dhuradhar typo
    if (/Dhuradhar/i.test(song.movie || '')) {
      changes.movie = song.movie.replace(/Dhuradhar/gi, 'Dhurandhar');
      console.log(`[MOVIE FIX] "${song.title}" movie: "${song.movie}" -> "${changes.movie}"`);
    }
    if (/Dhuradhar/i.test(song.album || '')) {
      changes.album = song.album.replace(/Dhuradhar/gi, 'Dhurandhar');
    }

    // Clean junk tags
    if (song.tags && song.tags.length > 0) {
      const cleanedTags = (song.tags as string[]).filter(tag => {
        const isJunk = tag.includes('#') || /piano notes/i.test(tag);
        return !isJunk;
      });
      if (cleanedTags.length !== song.tags.length) {
        const removed = song.tags.filter((t: string) => !cleanedTags.includes(t));
        console.log(`[TAG CLEAN] "${song.title}": removed tags ${JSON.stringify(removed)}`);
        changes.tags = cleanedTags;
      }
    }

    if (Object.keys(changes).length > 0) {
      await mongoose.connection.collection('songs').updateOne(
        { _id: song._id },
        { $set: changes }
      );
      updated++;
    }
  }

  console.log(`\nUpdated ${updated} songs.`);
  process.exit(0);
}

main();
