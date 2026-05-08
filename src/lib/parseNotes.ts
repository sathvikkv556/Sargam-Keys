/**
 * Utility to parse simple music notes into an internal format for playback.
 * Supports notes like C, D, E, F, G, A, B and their sharp/flat variations.
 * Automatically maps them to Octave 4 for simple piano playback.
 */

export interface ParsedNote {
  raw: string;      // The original text (e.g., "C#")
  pitch: string;    // The mapped pitch (e.g., "C#4")
  index: number;    // Position in the original sequence
}

const NOTE_MAPPING: Record<string, string> = {
  'C': 'C4', 'C#': 'C#4', 'Db': 'Db4',
  'D': 'D4', 'D#': 'D#4', 'Eb': 'Eb4',
  'E': 'E4',
  'F': 'F4', 'F#': 'F#4', 'Gb': 'Gb4',
  'G': 'G4', 'G#': 'G#4', 'Ab': 'Ab4',
  'A': 'A4', 'A#': 'A#4', 'Bb': 'Bb4',
  'B': 'B4'
};

export function parseNotes(rawText: string): ParsedNote[] {
  if (!rawText) return [];

  // Regex to find notes (C, C#, Db, etc.)
  // We look for A-G followed by optional # or b
  const noteRegex = /([A-G][#b]?)/g;
  
  const parsed: ParsedNote[] = [];
  let match;
  let count = 0;

  while ((match = noteRegex.exec(rawText)) !== null) {
    const raw = match[1];
    const pitch = NOTE_MAPPING[raw] || `${raw}4`;
    
    parsed.push({
      raw,
      pitch,
      index: count++
    });
  }

  return parsed;
}
