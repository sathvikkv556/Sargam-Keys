/**
 * Categorize songs: 
 * - "lyric_lines" = lines that look like song lyrics (Hindi/English phrases, not notes)
 * - "prose" = descriptive sentences about the song (not copyrighted lyrics)
 * - "note_line" = actual note rows
 * 
 * Returns per-song summary to help decide what to remove.
 */

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const NOTE_TOKEN = /^[A-Ga-g][#b]?[0-9]?$/;
const BAR_SEP = /^[|*\-=\[\]{}]+$/;  // bar separators like | --- === etc
const SECTION_LABEL = /^(\[.*\]|[*(].*[)*]|(verse|chorus|bridge|interlude|phrase|stanza|intro|outro|pre.chorus|refrain|hook|coda|part|section|theme|melody|piano notes|how to play|practice|scale|difficulty|beginner|note|song info|about|helpful|learning|useful|song|movie|composer|singer|artist|key|genre|title)\b.*:?$|#+\s*.+|[=>\-]{2,}|[-*•🎵🎹⏱️💡⭐].*|^\d+\..*)/i;

// Lyric patterns: short phrase lines typical of Hindi transliterations
const LYRIC_LINE = /^[a-zA-Z\u0900-\u097F][a-zA-Z\u0900-\u097F\s'\".,!?*-]{3,}$/;

function classifyLine(line: string): 'empty' | 'note' | 'separator' | 'section' | 'prose' | 'lyric' {
  const trimmed = line.trim();
  if (!trimmed) return 'empty';
  if (BAR_SEP.test(trimmed)) return 'separator';
  
  // Note line check
  const tokens = trimmed.split(/[\s|]+/).filter(Boolean);
  if (tokens.length > 0 && tokens.every(t => NOTE_TOKEN.test(t))) return 'note';
  
  if (SECTION_LABEL.test(trimmed)) return 'section';
  
  // Long prose sentences vs short lyric phrases
  // Prose has sentences (contains period, comma or is very long > 60 chars)
  if (trimmed.length > 80 || /[.!?]/.test(trimmed)) return 'prose';
  
  // Short lines that look like lyrics
  return 'lyric';
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to DB\n');

  const songs = await mongoose.connection.collection('songs').find({ status: 'Published' }).toArray();

  const report: { slug: string; title: string; hasLyrics: boolean; hasProse: boolean; lyricLines: string[]; proseSnippet: string }[] = [];

  for (const song of songs) {
    const notes: string = song.notes || '';
    const lines = notes.split('\n');
    const lyricLines: string[] = [];
    let hasProse = false;
    
    lines.forEach(line => {
      const cls = classifyLine(line);
      if (cls === 'lyric') lyricLines.push(line.trim());
      if (cls === 'prose') hasProse = true;
    });

    if (lyricLines.length > 0 || hasProse) {
      const proseLines = lines.filter(l => classifyLine(l) === 'prose');
      report.push({
        slug: song.slug,
        title: song.title,
        hasLyrics: lyricLines.length > 0,
        hasProse,
        lyricLines: lyricLines.slice(0, 5),
        proseSnippet: proseLines[0]?.trim().slice(0, 100) || ''
      });
    }
  }

  console.log('=== SONGS WITH LYRICS (copyrighted risk) ===');
  report.filter(r => r.hasLyrics).forEach(r => {
    console.log(`\n🎵 "${r.title}" (slug: ${r.slug})`);
    r.lyricLines.forEach(l => console.log(`  LYRIC: ${l}`));
  });
  
  console.log('\n\n=== SONGS WITH ONLY PROSE (descriptions, not lyrics) ===');
  report.filter(r => r.hasProse && !r.hasLyrics).forEach(r => {
    console.log(`  📄 "${r.title}" – ${r.proseSnippet}...`);
  });

  console.log(`\n\nTotal songs with lyric lines: ${report.filter(r => r.hasLyrics).length}`);
  console.log(`Total songs with prose-only: ${report.filter(r => r.hasProse && !r.hasLyrics).length}`);
  process.exit(0);
}

main();
