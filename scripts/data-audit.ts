/**
 * Scan and report:
 * 1. Songs with "Dhuradhar" in movie/album field
 * 2. Songs with junk tags like "#Phir se piano notes", "#Bollywood#..." 
 * 3. Songs with " piano notes" in title, movie, or tags fields
 */
import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to DB\n');

  const songs = await mongoose.connection.collection('songs').find({}).toArray();

  console.log('=== 1. DHURADHAR typo in movie/album field ===');
  songs.filter(s => /Dhuradhar/i.test(s.movie || '') || /Dhuradhar/i.test(s.album || '')).forEach(s => {
    console.log(`  "${s.title}" – movie: "${s.movie}" album: "${s.album}"`);
  });

  console.log('\n=== 2. JUNK TAGS (containing # or "piano notes") ===');
  songs.forEach(s => {
    const junkTags = (s.tags || []).filter((t: string) => t.includes('#') || /piano notes/i.test(t));
    if (junkTags.length > 0) {
      console.log(`  "${s.title}" (${s.slug})`);
      junkTags.forEach((t: string) => console.log(`    TAG: "${t}"`));
    }
  });

  console.log('\n=== 3. "piano notes" in title, movie or tags ===');
  songs.forEach(s => {
    const inTitle = /piano notes/i.test(s.title || '');
    const inMovie = /piano notes/i.test(s.movie || '');
    const inTags = (s.tags || []).some((t: string) => /piano notes/i.test(t));
    if (inTitle || inMovie || inTags) {
      console.log(`  "${s.title}" (${s.slug})`);
      if (inTitle) console.log(`    TITLE: "${s.title}"`);
      if (inMovie) console.log(`    MOVIE: "${s.movie}"`);
      if (inTags) console.log(`    TAGS: ${JSON.stringify((s.tags || []).filter((t: string) => /piano notes/i.test(t)))}`);
    }
  });

  process.exit(0);
}

main();
