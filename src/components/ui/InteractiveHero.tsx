'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Search, Sparkles, Music, Play, Radio } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function InteractiveHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
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
    <section ref={containerRef} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-white dark:bg-slate-950 px-4 py-20 text-slate-900 dark:text-white perspective-1000">
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-900/40 dark:to-purple-900/40" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse" />
      </div>

      {/* Musical Galaxy - Responsive Notations */}
      {notations.map((note, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            x: mousePosition.x * note.depth,
            y: mousePosition.y * note.depth,
            rotate: mousePosition.x * 0.1
          }}
          transition={{ duration: 1, type: "spring", stiffness: 50 }}
          className={`absolute pointer-events-none select-none font-serif ${note.size} ${note.color} blur-[1px]`}
          style={{ top: note.top, left: note.left }}
        >
          {note.icon === " musical-note" ? <Music className="h-full w-full opacity-20" /> : note.icon}
        </motion.div>
      ))}

      <div className="container relative z-10 mx-auto max-w-5xl text-center">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full bg-slate-900/5 dark:bg-white/5 px-6 py-2 text-sm font-semibold backdrop-blur-xl border border-slate-900/10 dark:border-white/10 shadow-2xl"
        >
          <Sparkles className="h-4 w-4 text-yellow-500 animate-spin-slow" />
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent uppercase tracking-widest">
            The Ultimate Piano Experience
          </span>
        </motion.div>

        <h1 className="mb-8 text-6xl font-black tracking-tighter sm:text-8xl lg:text-9xl leading-[0.9]">
          {["Play", "Your", "Soul"].map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, rotateX: -90 }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.5 + i * 0.2, duration: 0.8, type: "spring" }}
              className="inline-block bg-gradient-to-b from-slate-900 via-slate-900 to-slate-900/40 dark:from-white dark:via-white dark:to-white/30 bg-clip-text text-transparent px-2"
            >
              {word}{" "}
            </motion.span>
          ))}
        </h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="mx-auto mb-16 max-w-2xl text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed"
        >
          Master the keys with a world-class collection of <span className="text-blue-600 dark:text-blue-400 font-bold underline decoration-blue-500/30 underline-offset-4">free</span> piano notes and theory. 
          <span className="text-blue-500 dark:text-blue-400 block mt-2">Where music meets modern technology.</span>
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="mx-auto max-w-2xl"
        >
          <form action="/search" className="relative group perspective-1000">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-xl opacity-20 group-hover:opacity-60 transition duration-1000"></div>
            <div className="relative flex items-center">
              <Search className="absolute left-7 h-6 w-6 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              <Input 
                name="q"
                placeholder="Search songs, artists, or theory..." 
                className="h-20 pl-16 pr-44 text-xl rounded-full bg-white dark:bg-slate-900/80 border-slate-200 dark:border-white/5 focus:border-blue-500/50 shadow-3xl transition-all backdrop-blur-2xl text-slate-900 dark:text-white"
              />
              <Button type="submit" className="absolute right-3 h-14 rounded-full px-10 bg-blue-600 hover:bg-blue-500 font-black text-xl shadow-2xl shadow-blue-500/40 group-hover:scale-105 transition-transform active:scale-95">
                Explore
              </Button>
            </div>
          </form>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2 }}
          className="mt-16 flex flex-wrap justify-center gap-12 items-center"
        >
           <div className="flex items-center gap-3 text-slate-600 dark:text-slate-500 group cursor-pointer">
              <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 group-hover:border-blue-500/50 transition-all">
                <Radio className="h-5 w-5 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>
              <span className="text-sm font-bold tracking-widest uppercase">Live Lessons</span>
           </div>
           <div className="flex items-center gap-3 text-slate-600 dark:text-slate-500 group cursor-pointer">
              <div className="p-3 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/5 group-hover:border-indigo-500/50 transition-all">
                <Music className="h-5 w-5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400" />
              </div>
              <span className="text-sm font-bold tracking-widest uppercase">Sheet Music</span>
           </div>
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-slate-200 dark:border-white/20 rounded-full flex justify-center p-1"
      >
        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
      </motion.div>
    </section>
  );
}
