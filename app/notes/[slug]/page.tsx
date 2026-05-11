import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSongBySlug, getSongs } from '@/lib/actions/song';
import { SongNotes } from '@/components/SongNotes';
import { SongCard } from '@/components/SongCard';
import { PianoScale } from '@/components/PianoScale';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Music, Mic, Film, Scale, Key as MusicKey } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { SongActions } from '@/components/SongActions';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Song from '@/models/Song';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  try {
    await connectDB();
    const songs = await Song.find({ status: 'Published' }).select('slug');
    return songs.map((song) => ({
      slug: song.slug,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const session = await getServerSession(authOptions);
    const isAdmin = (session?.user as any)?.role === 'admin';
    const response = await getSongBySlug(slug, isAdmin);
    
    if (!response.success || !response.data) {
      return { title: response.notFound ? 'Song Not Found' : 'Error' };
    }

    const song = response.data;
    const seo = createPageMetadata(
      song.seoTitle || song.title,
      song.seoDescription || `Learn how to play ${song.title} on piano with our easy-to-follow notes.`,
      song.seoKeywords || [song.title, 'piano notes', song.movie || ''],
      `/notes/${song.slug}`
    );

    return {
      ...seo,
      openGraph: {
        ...seo.openGraph,
        type: 'article',
        images: song.thumbnail ? [{ url: song.thumbnail }] : undefined,
      },
    };
  } catch (error) {
    console.error('Metadata generation error:', error);
    return { title: 'SargamKeys' };
  }
}

export default async function SongPage({ params }: PageProps) {
  const { slug } = await params;
  
  const session = await getServerSession(authOptions);
  const isAdmin = (session?.user as any)?.role === 'admin';
  
  const response = await getSongBySlug(slug, isAdmin);

  if (!response.success || !response.data) {
    if (response.notFound) {
      notFound();
    }
    
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error Loading Page</h1>
        <p className="text-muted-foreground mb-8">
          {response.error || 'A temporary error occurred while fetching the song notes. Please try refreshing the page.'}
        </p>
        <div className="flex justify-center gap-4">
          <a 
            href="/notes"
            className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
          >
            Back to Library
          </a>
          <button 
            onClick={() => {
              if (typeof window !== 'undefined') window.location.reload();
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:opacity-90 transition-opacity"
          >
            Refresh Page
          </button>
        </div>
      </div>
    );
  }

  const song = response.data;
  
  // Fetch related songs (same category)
  const relatedResponse = await getSongs(
    { 
      category: typeof song.category === 'object' ? (song.category as any)._id : song.category,
      _id: { $ne: song._id },
      status: 'Published'
    },
    { limit: 4 }
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicComposition',
    name: song.title,
    description: song.seoDescription || `Piano notes for ${song.title}`,
    composer: song.composer ? { '@type': 'Person', name: song.composer } : undefined,
    genre: typeof song.category === 'object' ? (song.category as any).name : undefined,
    keywords: song.tags.join(','),
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Draft Warning for Admins */}
      {song.status === 'Draft' && (
        <div className="mb-6 rounded-lg bg-yellow-50 p-4 border border-yellow-200 dark:bg-yellow-900/20 dark:border-yellow-900/30">
          <p className="text-sm text-yellow-800 dark:text-yellow-200 font-medium flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-yellow-600" />
            Admin Preview: This song is currently a <strong>Draft</strong> and not visible to the public.
          </p>
        </div>
      )}

      {/* Print-only Branded Header */}
      <div className="print-header">
        <div className="flex items-center gap-2 mb-1">
          <img src="/logo.svg" alt="SargamKeys" className="h-8 w-8 object-contain" />
          <h1 className="text-2xl font-bold m-0">SargamKeys</h1>
        </div>
        <p className="text-sm">Learn Piano Notes & Music Theory • www.sargamkeys.in</p>
        <div className="mt-4 text-xl font-bold">{song.title}</div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline">{typeof song.category === 'object' ? (song.category as any).name : 'Song'}</Badge>
                <Badge variant="secondary">{song.difficulty}</Badge>
              </div>
              <SongActions title={song.title} />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl lg:text-5xl">
              {song.title} Piano Notes
            </h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {song.movie && (
                <div className="flex items-center gap-1">
                  <Film className="h-4 w-4" />
                  <span>Movie: {song.movie}</span>
                </div>
              )}
              {song.album && (
                <div className="flex items-center gap-1">
                  <Music className="h-4 w-4" />
                  <span>Album: {song.album}</span>
                </div>
              )}
              {song.singer && (
                <div className="flex items-center gap-1">
                  <Mic className="h-4 w-4" />
                  <span>Singer: {song.singer}</span>
                </div>
              )}
              {song.composer && (
                <div className="flex items-center gap-1">
                  <Music className="h-4 w-4" />
                  <span>Composer: {song.composer}</span>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Scale Visualizer (Unique Feature) */}
          <PianoScale scale={song.scale} />

          {/* Song Details Grid */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="flex flex-col gap-1 rounded-lg border bg-muted/30 p-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground uppercase font-semibold">
                <Scale className="h-3 w-3" />
                Scale
              </div>
              <span className="font-medium">{song.scale}</span>
            </div>
            <div className="flex flex-col gap-1 rounded-lg border bg-muted/30 p-3">
              <div className="flex items-center gap-1 text-xs text-muted-foreground uppercase font-semibold">
                <MusicKey className="h-3 w-3" />
                Key
              </div>
              <span className="font-medium">{song.key}</span>
            </div>
            <div className="flex flex-col gap-1 rounded-lg border bg-muted/30 p-3 text-center md:text-left">
               <div className="flex items-center gap-1 text-xs text-muted-foreground uppercase font-semibold">
                <Music className="h-3 w-3" />
                Difficulty
              </div>
              <span className="font-medium">{song.difficulty}</span>
            </div>
          </div>

          {/* Notes Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Music className="h-6 w-6 text-primary" />
              Piano Notes
            </h2>
            <SongNotes 
              initialNotes={song.notes} 
            />
          </div>

          {/* Chords Section */}
          {song.chords && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <MusicKey className="h-6 w-6 text-primary" />
                Chords
              </h2>
              <div className="whitespace-pre-wrap font-mono leading-relaxed rounded-xl border bg-card p-6">
                {song.chords}
              </div>
            </div>
          )}

          {/* Lyrics Section */}
          {song.lyrics && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Lyrics</h2>
              <div className="prose prose-gray dark:prose-invert max-w-none rounded-xl border p-6 bg-card whitespace-pre-wrap font-sans">
                {song.lyrics}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="sticky top-24 space-y-8">
            {/* Ad Placeholder */}
            <div className="h-[300px] w-full bg-muted/50 rounded-xl flex items-center justify-center border-2 border-dashed">
              <span className="text-muted-foreground">Advertisement</span>
            </div>

            {/* Related Songs */}
            {relatedResponse.success && relatedResponse.data && relatedResponse.data.songs.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Related Songs</h3>
                <div className="grid gap-4">
                  {relatedResponse.data.songs.map((relatedSong) => (
                    <SongCard key={relatedSong._id} song={relatedSong} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
