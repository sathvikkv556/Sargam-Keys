/**
 * DRY-RUN: Scans every song's notes field for lyric lines.
 * A "note line" is one where every non-empty token matches:
 *   - A-G optionally followed by # or b, optionally followed by a digit (e.g. C#4, Db, G5)
 *   - OR a section label (e.g. [Verse], Verse 1, Chorus:, Stanza, Interlude, Phrase, etc.)
 * Anything else is flagged as a potential lyric line.
 */

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const NOTE_TOKEN = /^[A-Ga-g][#b]?[0-9]?$/;
const SECTION_LABEL = /^(\[.*\]|[*(].*[)*]|(verse|chorus|bridge|interlude|phrase|stanza|intro|outro|pre.chorus|refrain|hook|coda|part|section)\s*\d*:?|#+\s*.+)$/i;

function isNoteLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return true; // blank lines are fine
  if (SECTION_LABEL.test(trimmed)) return true; // section labels are fine
  // Check if all tokens are note tokens (space-separated)
  const tokens = trimmed.split(/\s+/);
  return tokens.every(t => NOTE_TOKEN.test(t));
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to DB\n');

  const songs = await mongoose.connection.collection('songs').find({ status: 'Published' }).toArray();

  let totalFlagged = 0;
  for (const song of songs) {
    const notes: string = song.notes || '';
    const lines = notes.split('\n');
    const flaggedLines: { lineNum: number; line: string }[] = [];

    lines.forEach((line, i) => {
      if (!isNoteLine(line)) {
        flaggedLines.push({ lineNum: i + 1, line: line.trim() });
      }
    });

    if (flaggedLines.length > 0) {
      console.log(`\n🎵 Song: "${song.title}" (slug: ${song.slug})`);
      flaggedLines.forEach(({ lineNum, line }) => {
        console.log(`  Line ${lineNum}: ${line}`);
      });
      totalFlagged += flaggedLines.length;
    }
  }

  console.log(`\n\n--- DRY RUN COMPLETE ---`);
  console.log(`Scanned ${songs.length} songs. Found ${totalFlagged} flagged lines total.`);
  console.log(`No writes were made.`);
  process.exit(0);
}

main();
