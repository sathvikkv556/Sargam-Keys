'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Plus, 
  Minus, 
  Copy, 
  Check, 
  ChevronUp, 
  ChevronDown,
  Play,
  Square,
  Printer
} from 'lucide-react';
import { toast } from 'sonner';

const NOTES_ORDER = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const SARGAM_MAP: Record<string, string> = {
  'C': 'Sa',
  'C#': 're',
  'D': 'Re',
  'D#': 'ga',
  'E': 'Ga',
  'F': 'Ma',
  'F#': 'ma',
  'G': 'Pa',
  'G#': 'dha',
  'A': 'Dha',
  'A#': 'ni',
  'B': 'Ni'
};

export function SongNotes({ initialNotes }: { initialNotes: string }) {
  const [notes, setNotes] = useState(initialNotes || '');
  const [fontSize, setFontSize] = useState(16);
  const [copied, setCopied] = useState(false);
  const [transposeCount, setTransposeCount] = useState(0);
  const [isSargam, setIsSargam] = useState(false);
  
  // Metronome State
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  const playClick = () => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const envelope = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    envelope.gain.value = 0.1;
    envelope.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.1);

    osc.connect(envelope);
    envelope.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.1);
  };

  const toggleMetronome = () => {
    if (isPlaying) {
      if (timer) clearInterval(timer);
      setIsPlaying(false);
    } else {
      const interval = 60000 / bpm;
      playClick(); // Play first beat immediately
      const newTimer = setInterval(playClick, interval);
      setTimer(newTimer);
      setIsPlaying(true);
    }
  };

  // Update metronome if BPM changes while playing
  React.useEffect(() => {
    if (isPlaying) {
      if (timer) clearInterval(timer);
      const interval = 60000 / bpm;
      const newTimer = setInterval(playClick, interval);
      setTimer(newTimer);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [bpm]);

  const getDisplayNotes = () => {
    if (!isSargam) return notes;

    const noteRegex = /[A-G][#b]?/g;
    return notes.replace(noteRegex, (match) => {
      let normalized = match;
      if (match.endsWith('b')) {
        const base = match[0];
        const flatIndex = NOTES_ORDER.indexOf(base);
        let sharpIndex = (flatIndex - 1) % 12;
        if (sharpIndex < 0) sharpIndex += 12;
        normalized = NOTES_ORDER[sharpIndex];
      }
      return SARGAM_MAP[normalized] || match;
    });
  };

  const displayNotes = getDisplayNotes();

  const renderHighlightedNotes = (text: string) => {
    if (!text) return null;

    // Regex to match Western notes (A-G with optional # or b, followed by optional digit)
    // or Sargam notes (Sa, re, Re, ga, Ga, Ma, ma, Pa, dha, Dha, ni, Ni)
    const regex = isSargam 
      ? /(Sa|re|Re|ga|Ga|Ma|ma|Pa|dha|Dha|ni|Ni)/g
      : /([A-G][#b]?\d?)/g;

    const parts = text.split(regex);
    
    return parts.map((part, i) => {
      // Check if this part is a note
      let isNote = false;
      
      if (isSargam) {
        isNote = Object.values(SARGAM_MAP).includes(part);
      } else {
        // Handle Western notes with or without octaves
        const baseNote = part.replace(/\d/, '');
        const hasOctave = /\d/.test(part);
        
        isNote = NOTES_ORDER.includes(baseNote) || 
                 (baseNote.length === 2 && baseNote[1] === 'b' && NOTES_ORDER.includes(baseNote[0]));
      }
      
      if (isNote) {
        return (
          <span 
            key={i} 
            className="px-0.5 mx-[1px] rounded bg-sky-400/10 dark:bg-sky-400/20 text-sky-800 dark:text-sky-200 font-bold transition-colors"
          >
            {part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(displayNotes);
    setCopied(true);
    toast.success('Notes copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const changeFontSize = (delta: number) => {
    setFontSize((prev) => Math.min(Math.max(prev + delta, 12), 32));
  };

  const transposeNotes = (semitones: number) => {
    const transposeNote = (note: string) => {
      const index = NOTES_ORDER.indexOf(note);
      if (index === -1) return note;
      let newIndex = (index + semitones) % 12;
      if (newIndex < 0) newIndex += 12;
      return NOTES_ORDER[newIndex];
    };

    const noteRegex = /[A-G][#b]?/g;
    const newNotes = notes.replace(noteRegex, (match) => {
      let normalized = match;
      if (match.endsWith('b')) {
        const base = match[0];
        const flatIndex = NOTES_ORDER.indexOf(base);
        let sharpIndex = (flatIndex - 1) % 12;
        if (sharpIndex < 0) sharpIndex += 12;
        normalized = NOTES_ORDER[sharpIndex];
      }
      return transposeNote(normalized);
    });

    setNotes(newNotes);
    setTransposeCount((prev) => prev + semitones);
  };

  return (
    <div className="relative rounded-xl border bg-card p-4 md:p-6 shadow-sm overflow-hidden">
      {/* Controls Header */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-y-4 border-b pb-4">
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          {/* Font Size */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Font Size</span>
            <div className="flex items-center rounded-lg border bg-muted/30 p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-background" onClick={() => changeFontSize(-2)}>
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="w-10 text-center text-sm font-mono font-bold">{fontSize}</span>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-background" onClick={() => changeFontSize(2)}>
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Transpose */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Transpose</span>
            <div className="flex items-center rounded-lg border bg-muted/30 p-1">
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-background" onClick={() => transposeNotes(-1)}>
                <ChevronDown className="h-3.5 w-3.5" />
              </Button>
              <span className="w-10 text-center text-sm font-mono font-bold">
                {transposeCount > 0 ? `+${transposeCount}` : transposeCount}
              </span>
              <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-background" onClick={() => transposeNotes(1)}>
                <ChevronUp className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>

          {/* Practice (Metronome) */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Metronome</span>
            <div className="flex items-center rounded-lg border bg-muted/30 p-1 gap-1">
              <Button 
                variant={isPlaying ? "destructive" : "secondary"} 
                size="icon" 
                className="h-8 w-8" 
                onClick={toggleMetronome}
              >
                {isPlaying ? <Square className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
              </Button>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" className="h-8 w-6 hover:bg-background" onClick={() => setBpm(Math.max(bpm - 5, 40))}>
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-12 text-center text-xs font-mono font-bold leading-none">
                  {bpm}<span className="text-[8px] block opacity-50 font-sans mt-0.5">BPM</span>
                </span>
                <Button variant="ghost" size="icon" className="h-8 w-6 hover:bg-background" onClick={() => setBpm(Math.min(bpm + 5, 240))}>
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Group */}
        <div className="flex items-center gap-2 sm:self-end">
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0 sm:w-auto sm:px-3 gap-2"
            onClick={() => window.print()}
            title="Print Notes"
          >
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">Print</span>
          </Button>
          
          <Button
            variant={copied ? "secondary" : "default"}
            size="sm"
            className="h-9 min-w-[36px] sm:min-w-[100px] px-3 gap-2"
            onClick={handleCopy}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="hidden sm:inline font-medium">{copied ? 'Copied' : 'Copy Notes'}</span>
          </Button>
        </div>
      </div>

      {/* Sargam Conversion Button */}
      <div className="mb-6">
        <Button
          variant="outline"
          className="w-full bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400 font-bold py-6 hover:from-orange-100 hover:to-amber-100 dark:hover:from-orange-900/30 dark:hover:to-amber-900/30 transition-all shadow-md group"
          onClick={() => setIsSargam(!isSargam)}
        >
          <div className="flex flex-col items-center">
            <span className="text-lg">
              {isSargam ? 'Switch to Western (C D E)' : 'Convert to Sargam (Sa Re Ga)'}
            </span>
            <span className="text-[10px] font-normal opacity-70 uppercase tracking-widest mt-1 group-hover:tracking-[0.2em] transition-all">
              {isSargam ? 'Classical ↔ Modern' : 'Western ↔ Indian Classical'}
            </span>
          </div>
        </Button>
      </div>

      {/* Notes Display */}
      <div className="relative">
        <div 
          className="whitespace-pre-wrap font-mono leading-relaxed transition-all min-h-[200px] bg-slate-50/50 dark:bg-slate-900/50 rounded-lg p-4 md:p-6"
          style={{ fontSize: `${fontSize}px` }}
        >
          {renderHighlightedNotes(displayNotes)}
        </div>
      </div>

      {/* Mobile Sticky Back to Top */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-2 md:hidden no-print z-50">
        <Button 
          size="icon" 
          variant="secondary"
          className="shadow-xl rounded-full h-12 w-12 border bg-background/80 backdrop-blur" 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ChevronUp className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
