/**
 * Utility to detect the most likely musical scale from a set of notes.
 */

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Major Scale intervals: W-W-H-W-W-W-H
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
// Minor Scale intervals: W-H-W-W-H-W-W
const MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10];

export interface DetectedScale {
  scale: string; // e.g., "C Major"
  key: string;   // e.g., "C"
  score: number; // match percentage
}

export function detectScale(rawText: string): DetectedScale | null {
  if (!rawText) return null;

  // Extract notes from text (A-G with optional # or b)
  const noteRegex = /([A-G][#b]?)/g;
  const foundNotes = new Set<string>();
  let match;

  while ((match = noteRegex.exec(rawText)) !== null) {
    let note = match[1];
    // Normalize b to # for easier comparison
    if (note === 'Db') note = 'C#';
    if (note === 'Eb') note = 'D#';
    if (note === 'Gb') note = 'F#';
    if (note === 'Ab') note = 'G#';
    if (note === 'Bb') note = 'A#';
    foundNotes.add(note);
  }

  if (foundNotes.size === 0) return null;

  const results: DetectedScale[] = [];

  // Check every root note
  for (const root of NOTES) {
    const rootIndex = NOTES.indexOf(root);

    // Check Major
    const majorScaleNotes = MAJOR_INTERVALS.map(i => NOTES[(rootIndex + i) % 12]);
    let majorScore = 0;
    foundNotes.forEach(note => {
      if (majorScaleNotes.includes(note)) majorScore++;
    });
    results.push({
      scale: `${root} Major`,
      key: root,
      score: majorScore / foundNotes.size
    });

    // Check Minor
    const minorScaleNotes = MINOR_INTERVALS.map(i => NOTES[(rootIndex + i) % 12]);
    let minorScore = 0;
    foundNotes.forEach(note => {
      if (minorScaleNotes.includes(note)) minorScore++;
    });
    results.push({
      scale: `${root} Minor`,
      key: root,
      score: minorScore / foundNotes.size
    });
  }

  // Sort by score and return the best match
  results.sort((a, b) => b.score - a.score);

  return results[0] || null;
}
