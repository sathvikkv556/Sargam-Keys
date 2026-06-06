import { Metadata } from 'next';
import { Mail, Play, Music, BookOpen, Star, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About SargamKeys | Our Mission & Story',
  description: 'Discover the story behind SargamKeys. Founded by Sathvik KV, we are on a mission to provide the world\'s best free piano notes and keyboard notations for learners everywhere.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-4 relative z-10 text-center space-y-6">
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter">About SargamKeys</h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium">
            Master the piano with clear, accurate, and beginner-friendly note arrangements.
          </p>
        </div>
      </section>

      {/* Founder Story */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold uppercase tracking-wider">
                <Music className="h-4 w-4" />
                <span>Founder&apos;s Story</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">Introduction</h2>
              <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400">
                <p>
                  My name is <strong>Sathvik KV</strong>, and I am the founder of SargamKeys. As a self-taught pianist, I have been playing the piano for over a decade now.
                </p>
                <p>
                  SargamKeys came to me as an idea after noticing how difficult it could be to find proper piano notes. Throughout the past 10 years of learning music, especially learning songs by ear, I noticed that many of the internet sources of note arrangement were either incorrect, incomplete, or not beginner-friendly.
                </p>
                <p>
                  I founded this website to ensure that aspiring pianists and other people have access to clear and accurate note arrangements, allowing them to learn and master songs easily.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 aspect-square rounded-3xl bg-slate-100 dark:bg-slate-900 overflow-hidden relative group">
               <img src="/logo.jpg" alt="Sathvik KV" className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
               <div className="absolute inset-0 bg-blue-600/10 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>

      {/* Musical Background */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">Musical Background</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">
                I have been interested in melodies for more than a decade. In addition to managing this website, I have a YouTube channel where I post videos related to piano.
              </p>
              <div className="pt-4">
                <Button asChild size="lg" className="rounded-full bg-red-600 hover:bg-red-700 h-14 px-8 gap-2">
                  <Link href="https://www.youtube.com/@Sathvik_Keys" target="_blank">
                    <Play className="h-5 w-5" />
                    Visit Sathvik Keys on YouTube
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 pt-8">
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 space-y-4 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="h-12 w-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                  <Star className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black">What You Can Find Here</h3>
                <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Piano notes for Bollywood and Hindi songs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Keyboard notes for songs in regional languages (Tamil, Telugu, Kannada, Malayalam)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Information on the song scale and key</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Notes suitable for beginners</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>Notation that is easy to understand and read</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 font-bold">•</span>
                    <span>A library of over 100 regularly updated songs</span>
                  </li>
                </ul>
              </div>

              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 space-y-4 shadow-xl shadow-slate-200/50 dark:shadow-none">
                <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white">
                  <BookOpen className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-black">Purpose of SargamKeys</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Not everyone needs to spend months studying theory before learning to play piano. For many, it would be better if there was a simpler way to learn.
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  My purpose in creating SargamKeys was to facilitate quick but efficient song learning with an emphasis on practicality. Everything that I publish here is arranged in a beginner-friendly fashion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience */}
      <section className="py-20 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-12">
            <h2 className="text-3xl md:text-5xl font-black tracking-tight">Who Is This For?</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: <Users className="h-6 w-6" />, label: "Beginners" },
                { icon: <Music className="h-6 w-6" />, label: "Self-Taught" },
                { icon: <BookOpen className="h-6 w-6" />, label: "Students" },
                { icon: <Star className="h-6 w-6" />, label: "Teachers" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 transition-all hover:scale-105">
                  <div className="h-12 w-12 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center shadow-md">
                    {item.icon}
                  </div>
                  <span className="font-bold uppercase tracking-wider text-sm">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="pt-12 space-y-6">
               <h3 className="text-3xl font-black">Looking Forward</h3>
               <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
                 My goal for the future is to continue developing this website by providing a comprehensive library of note arrangements for piano learners across the globe.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center space-y-10">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Get in Touch!</h2>
          <p className="text-xl md:text-2xl text-blue-100 max-w-2xl mx-auto">
            If you have a song request, a suggestion, or just a few words of encouragement, feel free to reach out.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <Button asChild size="lg" className="h-16 px-10 rounded-full bg-white text-blue-600 hover:bg-slate-100 text-lg font-black gap-2">
              <a href="mailto:ksathvik485@gmail.com">
                <Mail className="h-5 w-5" />
                ksathvik485@gmail.com
              </a>
            </Button>
          </div>
          <div className="pt-10 border-t border-white/20 max-w-lg mx-auto">
             <p className="font-bold text-xl uppercase tracking-widest mb-2">Sathvik KV</p>
             <p className="text-blue-200">Founder of SargamKeys</p>
             <p className="text-blue-200">Self-Taught Pianist | Over 10 Years of Experience</p>
          </div>
        </div>
      </section>
    </div>
  );
}
