'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface PianoScaleProps {
  scale: string; // e.g., "C Major", "D# Minor"
}

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Major Scale intervals: W-W-H-W-W-W-H
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11];
// Minor Scale intervals: W-H-W-W-H-W-W
const MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10];

export function PianoScale({ scale }: PianoScaleProps) {
  if (!scale) return null;

  const getScaleNotes = () => {
    const parts = scale.split(' ');
    const root = parts[0];
    const type = parts[1]?.toLowerCase() || 'major';
    
    const rootIndex = NOTES.indexOf(root);
    if (rootIndex === -1) return [];

    const intervals = type === 'minor' ? MINOR_INTERVALS : MAJOR_INTERVALS;
    return intervals.map(i => NOTES[(rootIndex + i) % 12]);
  };

  const scaleNotes = getScaleNotes();

  const renderKey = (note: string, isBlack: boolean) => {
    const isSelected = scaleNotes.includes(note);
    
    return (
      <div 
        key={note}
        className={cn(
          "relative flex items-end justify-center pb-2 transition-colors",
          isBlack 
            ? "z-10 -mx-3 h-20 w-6 rounded-b-sm bg-gray-900 shadow-md" 
            : "h-32 w-10 border border-gray-200 bg-white rounded-b-md shadow-sm",
          isSelected && (isBlack ? "bg-blue-600" : "bg-blue-100")
        )}
      >
        <span className={cn(
          "text-[8px] font-bold uppercase",
          isBlack ? "text-gray-400" : "text-gray-400",
          isSelected && (isBlack ? "text-white" : "text-blue-600")
        )}>
          {note}
        </span>
        {isSelected && (
          <div className={cn(
            "absolute bottom-1 h-1.5 w-1.5 rounded-full",
            isBlack ? "bg-white" : "bg-blue-600"
          )} />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-muted/20 p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
          {scale} Scale Reference
        </h3>
        <span className="text-[10px] text-muted-foreground italic">Highlighted keys are used in this song</span>
      </div>
      
      <div className="flex justify-center overflow-x-auto pb-2">
        <div className="flex select-none">
          {NOTES.map((note, i) => {
            const isBlack = note.includes('#');
            if (isBlack) return null;
            
            // Render white key and its following black key (if any)
            const blackNote = NOTES[i + 1]?.includes('#') ? NOTES[i + 1] : null;
            
            return (
              <React.Fragment key={note}>
                {renderKey(note, false)}
                {blackNote && renderKey(blackNote, true)}
              </React.Fragment>
            );
          })}
          {/* Add one more C for completion */}
          {renderKey('C', false)}
        </div>
      </div>
    </div>
  );
}
