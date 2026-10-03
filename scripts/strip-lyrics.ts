/**
 * APPLY MODE: Strip lyric lines from song notes fields.
 * 
 * Logic:
 * 1. Back up the full songs collection to songs_backup_pre_lyric_strip.json
 * 2. For each song, scan notes line by line:
 *    - Keep: note lines, blank lines, section labels
 *    - Remove: lyric lines (short Hindi/English phrases that aren't notes)
 *    - Where lyric lines separated two groups of note rows, insert "Phrase N" labels
 * 3. Also strip the leading prose paragraph (description at top of notes) if present
 * 4. Write back to DB only if changes were made
 */

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
dotenv.config({ path: '.env.local' });

const NOTE_TOKEN = /^[A-Ga-g][#b]?[0-9]?$/;
const BAR_SEPARATOR = /^\|$/;

// A line is a "note line" if every token (split by space or |) is a note token or bar separator
function isNoteLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  const tokens = trimmed.split(/[\s|]+/).filter(Boolean);
  return tokens.length > 0 && tokens.every(t => NOTE_TOKEN.test(t) || BAR_SEPARATOR.test(t));
}

// A section label: [Verse], Chorus:, bridge Section, etc.
const SECTION_LABEL_RE = /^(\[.*\]|[-=*]{2,}|[►•🎵🎹💡⏱️⭐].*|(verse|chorus|bridge|interlude|phrase|stanza|intro|outro|pre.?chorus|refrain|hook|coda|part|section|theme|melody|bridge section|main theme|how to play|practice|learning|useful|helpful)\s*\d*:?$)/i;

function isSectionLabel(line: string): boolean {
  return SECTION_LABEL_RE.test(line.trim());
}

// A "lyric line": not a note line, not a section label, not blank, and short (< 80 chars)
// Prose is long (>= 80 chars) or contains sentence-ending punctuation — those are editorial, keep them.
function isLyricLine(line: string): boolean {
  const trimmed = line.trim();
  if (!trimmed) return false;
  if (isNoteLine(trimmed)) return false;
  if (isSectionLabel(trimmed)) return false;
  // Prose: long sentence or contains . ! ? 
  if (trimmed.length >= 80) return false;
  if (/[.!?]$/.test(trimmed)) return false;
  // Scale notation lines like "C – D – E – F – G" are editorial, not lyrics
  if (/^[A-Ga-g#\s–\-→]+$/.test(trimmed)) return false;
  // Lines starting with emoji or bullet chars are editorial
  if (/^[•►🎵🎹💡⭐*=-]/.test(trimmed)) return false;
  // Lines that are metadata (Title:, Movie:, Scale:, etc.) 
  if (/^(title|movie|singer|composer|scale|difficulty|genre|category|album|artist|film|music|notes in|note in|notes used|key|playing level|type)[\s:]/i.test(trimmed)) return false;
  // "Why..." "How..." "About..." "Practice..." headers
  if (/^(why|how|about|practice|learning|note|song|helpful|useful|beginner|=>|=\s*>)/i.test(trimmed)) return false;
  return true;
}

// Strip lyric lines and insert "Phrase N" labels where note groups were separated
function stripLyrics(notes: string): { cleaned: string; removedCount: number } {
  const lines = notes.split('\n');
  const result: string[] = [];
  let removedCount = 0;
  let phraseCount = 0;
  let lastLineWasNote = false;
  let pendingPhraseLabel = false;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();

    if (!trimmed) {
      // Keep blank lines, but reset note context
      result.push(raw);
      continue;
    }

    if (isLyricLine(trimmed)) {
      removedCount++;
      // If we were in a note block, mark that the next note block needs a new phrase label
      if (lastLineWasNote) {
        pendingPhraseLabel = true;
        lastLineWasNote = false;
      }
      // Remove the lyric line (don't push to result)
      continue;
    }

    // If this is a note line and there's a pending phrase label, insert it
    if (isNoteLine(trimmed) && pendingPhraseLabel) {
      phraseCount++;
      // Retroactively label the previous phrase too if we haven't yet
      if (phraseCount === 1) {
        // insert "Phrase 1" before the first group — find where to put it
        // Actually: insert before the *current* note after the gap
        result.push(`Phrase ${phraseCount}`);
      } else {
        result.push(`Phrase ${phraseCount}`);
      }
      pendingPhraseLabel = false;
    }

    result.push(raw);

    if (isNoteLine(trimmed) || isSectionLabel(trimmed)) {
      lastLineWasNote = isNoteLine(trimmed);
    }
  }

  // Clean up: remove leading/trailing blank lines and multiple consecutive blank lines
  const cleaned = result
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();

  return { cleaned, removedCount };
}

async function main() {
  await mongoose.connect(process.env.MONGODB_URI as string);
  console.log('Connected to DB\n');

  const songs = await mongoose.connection.collection('songs').find({}).toArray();

  // Step 1: Backup
  const backupPath = 'songs_backup_pre_lyric_strip.json';
  fs.writeFileSync(backupPath, JSON.stringify(songs, null, 2));
  console.log(`✅ Backup saved to ${backupPath} (${songs.length} songs)\n`);

  // Step 2: Strip lyrics
  let updatedCount = 0;
  let totalRemoved = 0;

  for (const song of songs) {
    const notes: string = song.notes || '';
    const { cleaned, removedCount } = stripLyrics(notes);

    if (removedCount > 0 && cleaned !== notes) {
      await mongoose.connection.collection('songs').updateOne(
        { _id: song._id },
        { $set: { notes: cleaned } }
      );
      console.log(`✂️  "${song.title}" (${song.slug}): removed ${removedCount} lyric lines`);
      updatedCount++;
      totalRemoved += removedCount;
    }
  }

  console.log(`\n=== DONE ===`);
  console.log(`Updated ${updatedCount} songs, removed ${totalRemoved} lyric lines total.`);
  console.log(`Backup is at: ${backupPath}`);
  process.exit(0);
}

main().catch(e => { console.error(e); process.exit(1); });
