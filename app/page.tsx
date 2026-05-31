import Link from 'next/link';
import { getSongs } from '@/lib/actions/song';
import { getCategories } from '@/lib/actions/category';
import { SongCard } from '@/components/SongCard';
import { Button } from '@/components/ui/button';
import { Clock, TrendingUp, Music } from 'lucide-react';
import { Metadata } from 'next';
import { MusicTheoryFeature } from '@/components/MusicTheoryFeature';
import { InteractiveHero } from '@/components/ui/InteractiveHero';
import { TiltCard } from '@/components/ui/TiltCard';

export const metadata: Metadata = {
  title: 'SargamKeys - Premium Piano Notes & Music Theory Library',
  description: 'Master piano with accurate notes for Bollywood, Pop, and Classical songs. Explore comprehensive music theory guides, scales, and chords.',
  alternates: {
    canonical: '/',
  },
};

export default async function HomePage() {
  const [trendingResponse, latestResponse, categoriesResponse] = await Promise.all([
    getSongs({ status: 'Published' }, { sort: { views: -1 }, limit: 4 }),
    getSongs({ status: 'Published' }, { sort: { createdAt: -1 }, limit: 8 }),
    getCategories(),
  ]);

  const trendingSongs = trendingResponse.success ? trendingResponse.data?.songs || [] : [];
  const latestSongs = latestResponse.success ? latestResponse.data?.songs || [] : [];
  const categories = categoriesResponse.success ? categoriesResponse.data || [] : [];

  return (
    <div className="flex flex-col gap-0 pb-12">
      {/* Ultra-Premium Interactive Hero */}
      <InteractiveHero />

      {/* Trending Songs Section */}
      {trendingSongs.length > 0 && (
        <section className="py-32 bg-white dark:bg-slate-950 overflow-hidden">
          <div className="container mx-auto px-4">
            <div className="mb-16 flex items-end justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-blue-600 font-black tracking-[0.2em] uppercase text-xs">
                  <TrendingUp className="h-4 w-4" />
                  <span>The Most Played</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tight">Trending Notes</h2>
              </div>
              <Button variant="outline" asChild className="rounded-full h-12 px-8 border-2 font-bold hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                <Link href="/notes?sort=views">Catalog</Link>
              </Button>
            </div>
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {trendingSongs.map((song) => (
                <SongCard key={song._id} song={song} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Flagship Music Theory Section */}
      <div className="bg-slate-50 dark:bg-slate-900/20">
        <MusicTheoryFeature />
      </div>

      {/* Latest Uploads */}
      <section className="py-32 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex items-end justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-indigo-600 font-black tracking-[0.2em] uppercase text-xs">
                <Clock className="h-4 w-4" />
                <span>New Arrivals</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight">Freshly Composed</h2>
            </div>
            <Button variant="ghost" asChild className="rounded-full h-12 px-8 font-bold hover:bg-slate-100 dark:hover:bg-white/5">
              <Link href="/notes">See All New</Link>
            </Button>
          </div>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {latestSongs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid - High Fidelity */}
      {categories.length > 0 && (
        <section className="py-32 bg-slate-950 text-white relative overflow-hidden">
          {/* Decorative Background for Category Section */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px]" />

          <div className="container mx-auto px-4 text-center mb-20 relative z-10">
             <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-6">Explore Genres</h2>
             <p className="text-slate-400 text-xl max-w-2xl mx-auto">From Bollywood classics to modern pop hits, find notes for every mood.</p>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categories.slice(0, 6).map((category) => (
                <TiltCard key={category._id}>
                  <Link 
                    href={`/categories/${category.slug}`}
                    className="group relative flex flex-col items-center justify-center rounded-[2.5rem] border border-white/5 bg-white/5 p-10 text-center transition-all hover:border-blue-500/50 hover:bg-white/10 overflow-hidden backdrop-blur-xl h-full"
                  >
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 text-white group-hover:bg-blue-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-2xl">
                      <Music className="h-10 w-10" />
                    </div>
                    <span className="font-black text-xl tracking-tight uppercase">{category.name}</span>
                  </Link>
                </TiltCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Ultra-Premium CTA Section */}
      <section className="container mx-auto px-4 py-32 overflow-hidden">
        <TiltCard>
          <div className="relative rounded-[4rem] bg-slate-50 dark:bg-slate-900 overflow-hidden px-10 py-24 text-center text-slate-900 dark:text-white border border-slate-200 dark:border-white/10 shadow-3xl">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 dark:invert" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 rounded-full blur-[150px]" />
            
            <div className="relative z-10 max-w-4xl mx-auto space-y-10">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">Share Your <br/>Musical Magic</h2>
              <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-400 text-2xl leading-relaxed">
                Be part of the largest community of piano enthusiasts. Contribute your <span className="text-blue-600 dark:text-blue-400 font-bold">free</span> notes and inspire millions.
              </p>
              <div className="flex flex-wrap justify-center gap-8 pt-6">
                <Button size="lg" className="h-20 px-14 rounded-full bg-blue-600 text-white hover:bg-blue-700 hover:scale-105 active:scale-95 text-xl font-black transition-all shadow-2xl shadow-blue-600/20">
                  Submit Now
                </Button>
                <Button size="lg" variant="outline" className="h-20 px-14 rounded-full border-2 border-slate-200 dark:border-white/20 text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 text-xl font-black backdrop-blur-xl transition-all">
                  Guide
                </Button>
              </div>
            </div>
          </div>
        </TiltCard>
      </section>
    </div>
  );
}
