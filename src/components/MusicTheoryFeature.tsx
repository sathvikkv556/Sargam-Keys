'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Award, Layers, Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function MusicTheoryFeature() {
  const features = [
    {
      icon: <Layers className="h-6 w-6 text-blue-500" />,
      title: "Scales & Modes",
      description: "Master the foundation of melody and harmony."
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Chord Theory",
      description: "Understand how to build and move between chords."
    },
    {
      icon: <Award className="h-6 w-6 text-purple-500" />,
      title: "Song Structure",
      description: "Analyze your favorite hits from a theorist&apos;s view."
    }
  ];

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10 md:gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-6 md:space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-semibold mx-auto lg:mx-0">
              <BookOpen className="h-4 w-4" />
              <span>Flagship Course</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
              Master Music Theory <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                The Practical Way
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0">
              Don&apos;t just memorize notes. Understand the &quot;why&quot; behind every melody. Our comprehensive course takes you from absolute beginner to advanced composer.
            </p>

            <div className="grid sm:grid-cols-3 gap-4 md:gap-6 pt-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -5 }}
                  className="p-4 rounded-2xl bg-card border border-muted shadow-sm"
                >
                  <div className="mb-3 flex justify-center lg:justify-start">{feature.icon}</div>
                  <h4 className="font-bold mb-1">{feature.title}</h4>
                  <p className="text-xs text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <div className="pt-6">
              <Button asChild size="lg" className="h-14 px-8 rounded-full bg-blue-600 hover:bg-blue-700 text-lg group w-full sm:w-auto">
                <Link href="/music-theory" className="flex items-center justify-center gap-2">
                  Start Learning Now
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            className="flex-1 relative w-full max-w-lg lg:max-w-none mx-auto"
          >
            {/* 3D-like Card Stack Effect */}
            <div className="relative z-10 w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 to-blue-900 flex items-center justify-center p-6 md:p-8">
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
               <div className="text-center space-y-6 relative z-10">
                  <div className="w-24 h-24 mx-auto rounded-full bg-blue-500/20 flex items-center justify-center animate-pulse">
                     <BookOpen className="h-12 w-12 text-blue-400" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-white">Full Theory Roadmap</h3>
                    <p className="text-blue-200/70">24 Lessons • 12 Worksheets • Lifetime Access</p>
                  </div>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-8 h-1 bg-blue-500 rounded-full"></div>
                    ))}
                  </div>
               </div>
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
