'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, Music } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const notations = [
    { icon: "𝄞", top: "15%", left: "10%", size: "text-6xl", color: "text-blue-500/20 dark:text-blue-500/20", depth: 0.8 },
    { icon: "𝄢", top: "70%", left: "5%", size: "text-7xl", color: "text-purple-500/20 dark:text-purple-500/20", depth: 1.2 },
    { icon: "♯", top: "25%", left: "85%", size: "text-5xl", color: "text-blue-400/20 dark:text-blue-400/20", depth: 0.5 },
    { icon: "♭", top: "80%", left: "80%", size: "text-6xl", color: "text-indigo-500/20 dark:text-indigo-500/20", depth: 1.5 },
    { icon: "♩", top: "40%", left: "20%", size: "text-4xl", color: "text-slate-500/20 dark:text-slate-500/20", depth: 0.3 },
    { icon: "♪", top: "10%", left: "60%", size: "text-5xl", color: "text-blue-300/20 dark:text-blue-300/20", depth: 0.9 },
    { icon: "♫", top: "60%", left: "75%", size: "text-6xl", color: "text-purple-400/20 dark:text-purple-400/20", depth: 1.1 },
    { icon: " musical-note", top: "85%", left: "25%", size: "text-4xl", color: "text-blue-600/20 dark:text-blue-600/20", depth: 0.7 },
  ];

  return (
    <section ref={containerRef} className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950 px-4 py-20 text-slate-900 dark:text-white">
      {/* Dynamic Background - Using CSS for better performance */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/20 dark:to-purple-900/20" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] opacity-50 transition-opacity duration-1000" />
      </div>

      {/* Musical Galaxy - Only animate if mounted to prevent hydration mismatch and simplify initial render */}
      {isMounted && notations.map((note, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: 1, 
            x: mousePosition.x * note.depth,
            y: mousePosition.y * note.depth,
            rotate: mousePosition.x * 0.1
          }}
          transition={{ duration: 1, delay: i * 0.1 }}
          className={`absolute pointer-events-none select-none font-serif ${note.size} ${note.color} blur-[1px] hidden sm:block`}
          style={{ top: note.top, left: note.left }}
        >
          {note.icon === " musical-note" ? <Music className="h-full w-full opacity-20" /> : note.icon}
        </motion.div>
      ))}

      <div className="container relative z-10 mx-auto max-w-5xl text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-slate-900/5 dark:bg-white/5 px-6 py-2 text-sm font-semibold backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-sm">
          <Sparkles className="h-4 w-4 text-yellow-500" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent uppercase tracking-widest">
            The Ultimate Piano Experience
          </span>
        </div>

        <h1 className="mb-8 text-5xl font-black tracking-tighter sm:text-8xl lg:text-9xl leading-[0.9]">
          <span className="inline-block bg-gradient-to-b from-slate-900 via-slate-900 to-slate-900/40 dark:from-white dark:via-white dark:to-white/30 bg-clip-text text-transparent px-2">Play </span>
          <span className="inline-block bg-gradient-to-b from-slate-900 via-slate-900 to-slate-900/40 dark:from-white dark:via-white dark:to-white/30 bg-clip-text text-transparent px-2">Your </span>
          <span className="inline-block bg-gradient-to-b from-slate-900 via-slate-900 to-slate-900/40 dark:from-white dark:via-white dark:to-white/30 bg-clip-text text-transparent px-2">Soul</span>
        </h1>
        
        <p className="mx-auto mb-10 md:mb-16 max-w-2xl text-lg md:text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          Master the keys with a world-class collection of <span className="text-blue-600 dark:text-blue-400 font-bold underline decoration-blue-500/30 underline-offset-4">free</span> piano notes and theory. 
          <span className="text-blue-500 dark:text-blue-400 block mt-2">Where music meets modern technology.</span>
        </p>
        
        <div className="mx-auto max-w-2xl">
          <form action="/search" className="relative group" role="search">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-5 md:left-7 h-5 w-5 md:h-6 md:w-6 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 transition-colors" aria-hidden="true" />
              <Input 
                name="q"
                placeholder="Search songs, artists, or theory..." 
                aria-label="Search piano notes and music theory"
                className="h-16 md:h-20 pl-12 md:pl-16 pr-32 md:pr-44 text-lg md:text-xl rounded-full bg-white dark:bg-slate-900/80 border-slate-200 dark:border-white/5 focus:border-blue-500/50 shadow-lg transition-all backdrop-blur-2xl text-slate-900 dark:text-white"
                required
              />
              <Button 
                type="submit" 
                className="absolute right-2 md:right-3 h-12 md:h-14 rounded-full px-6 md:px-10 bg-blue-600 hover:bg-blue-500 font-black text-lg md:text-xl shadow-xl transition-transform active:scale-95"
                aria-label="Search"
              >
                Explore
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Animated Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-slate-200 dark:border-white/20 rounded-full flex justify-center p-1">
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" />
      </div>
    </section>
  );
}
