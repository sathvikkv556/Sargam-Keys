import Link from 'next/link';
import { getSongs } from '@/lib/actions/song';
import { getCategories } from '@/lib/actions/category';
import { SongCard } from '@/components/SongCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Music, TrendingUp, Clock, Grid } from 'lucide-react';
import { Metadata } from 'next';

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
    <div className="flex flex-col gap-12 pb-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-600 to-blue-800 px-4 py-20 text-white dark:from-blue-900 dark:to-slate-950">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Master Your Favorite Songs on Piano
          </h1>
          <p className="mb-10 text-lg text-blue-100 sm:text-xl">
            Access thousands of accurate piano notes, scales, and music theory guides.
          </p>
          
          <form action="/search" className="relative mx-auto max-w-2xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input 
              name="q"
              placeholder="Search for songs, movies, or singers..." 
              className="h-14 pl-12 pr-32 text-lg text-black dark:text-white rounded-full bg-white dark:bg-slate-900 border-none shadow-xl"
            />
            <Button type="submit" className="absolute right-2 top-1/2 h-10 -translate-y-1/2 rounded-full px-6 bg-blue-600 hover:bg-blue-700">
              Search
            </Button>
          </form>

          <div className="mt-8 flex flex-wrap justify-center gap-4 text-sm font-medium">
            <span>Popular:</span>
            <Link href="/search?q=Bollywood" className="hover:underline">Bollywood</Link>
            <Link href="/search?q=Classical" className="hover:underline">Classical</Link>
            <Link href="/search?q=Pop" className="hover:underline">Pop</Link>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl" />
      </section>

      {/* Trending Songs */}
      {trendingSongs.length > 0 && (
        <section className="container mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight md:text-3xl">
              <TrendingUp className="h-6 w-6 text-orange-500" />
              Trending Songs
            </h2>
            <Button variant="ghost" asChild>
              <Link href="/notes?sort=views">View All</Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trendingSongs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className="bg-muted/30 py-12">
          <div className="container mx-auto px-4">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight md:text-3xl">
                <Grid className="h-6 w-6 text-blue-500" />
                Browse by Category
              </h2>
              <Button variant="ghost" asChild>
                <Link href="/categories">All Categories</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {categories.slice(0, 6).map((category) => (
                <Link 
                  key={category._id} 
                  href={`/categories/${category.slug}`}
                  className="group flex flex-col items-center justify-center rounded-xl border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Music className="h-6 w-6" />
                  </div>
                  <span className="font-semibold">{category.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Uploads */}
      <section className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-2xl font-bold tracking-tight md:text-3xl">
            <Clock className="h-6 w-6 text-green-500" />
            Latest Uploads
          </h2>
          <Button variant="ghost" asChild>
            <Link href="/notes">View All</Link>
          </Button>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {latestSongs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      </section>

      {/* Ad Placeholder */}
      <section className="container mx-auto px-4">
        <div className="h-[200px] w-full bg-muted/50 rounded-xl flex flex-col items-center justify-center border-2 border-dashed gap-2">
          <span className="text-muted-foreground font-medium uppercase tracking-widest text-xs">Advertisement</span>
          <div className="h-10 w-48 bg-muted rounded animate-pulse" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="rounded-3xl bg-slate-900 px-8 py-16 text-center text-white dark:bg-blue-900/20 dark:border dark:border-blue-500/20">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Want to contribute?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-slate-300">
            Join our community and share your piano notes with thousands of learners worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
              Submit Piano Notes
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
