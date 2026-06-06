import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSongBySlug, getSongs } from '@/lib/actions/song';
import { SongNotes } from '@/components/SongNotes';
import { SongCard } from '@/components/SongCard';
import { RelatedSongs } from '@/components/RelatedSongs';
import { PianoScale } from '@/components/PianoScale';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Music, Mic, Film, Scale, Key as MusicKey, BookOpen, ChevronRight, Play } from 'lucide-react';
import { createPageMetadata } from '@/lib/seo';
import { SongActions } from '@/components/SongActions';
import { CommentSection } from '@/components/CommentSection';
import AnalyticsTracker from '@/components/AnalyticsTracker';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/db';
import Song from '@/models/Song';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export const revalidate = 3600; // Revalidate every hour

// Helper to get theory recommendations based on song attributes
function getTheoryRecommendations(song: any) {
  const recommendations = [];
  
  // Basic recommendation for all songs
  recommendations.push({
    id: 'meet-your-keyboard',
    title: 'Meet Your Keyboard',
    description: 'New to piano? Start here to understand the layout.'
  });

  // Scale-based recommendations
  if (song.scale.toLowerCase().includes('major')) {
    recommendations.push({
      id: 'major-scales-intro',
      title: 'Mastering Major Scales',
      description: `Learn the theory behind the ${song.scale} scale.`
    });
  } else if (song.scale.toLowerCase().includes('minor')) {
    recommendations.push({
      id: 'natural-minor-scales',
      title: 'Minor Scale Secrets',
      description: `Understand the emotional ${song.scale} used in this song.`
    });
  }

  // Chord recommendations if the song has chords
  if (song.chords) {
    recommendations.push({
      id: 'triads-101',
      title: 'Understanding Chords',
      description: 'Learn how to play the chords used in this melody.'
    });
  }

  // Category specific (e.g. Bollywood)
  const categoryName = typeof song.category === 'object' ? (song.category as any).name : '';
  if (categoryName.toLowerCase().includes('bollywood')) {
    recommendations.push({
      id: 'bollywood-scale-secrets',
      title: 'Bollywood Piano Secrets',
      description: 'Master the specific scales and glides used in Indian hits.'
    });
  }

  return recommendations.slice(0, 3); // Return top 3
}

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
    const moviePart = song.movie ? ` (${song.movie})` : '';
    const pageTitle = song.seoTitle || `${song.title} Piano Notes${moviePart} - ${song.scale} Scale`;
    const pageDescription = song.seoDescription || `Learn how to play ${song.title}${song.movie ? ` from the movie ${song.movie}` : ''} on piano with our easy-to-follow notes in ${song.scale} scale. Perfect for beginners and keyboard players.`;

    const seo = createPageMetadata(
      pageTitle,
      pageDescription,
      song.seoKeywords || [song.title, 'piano notes', song.movie || '', 'keyboard notes', 'sargam notes', `${song.scale} scale`],
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
          <Link 
            href="/notes"
            className="px-4 py-2 border rounded-md hover:bg-muted transition-colors"
          >
            Back to Library
          </Link>
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
  
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'MusicComposition',
    name: song.title,
    description: song.seoDescription || `Piano notes for ${song.title}`,
    composer: song.composer ? { '@type': 'Person', name: song.composer } : undefined,
    genre: typeof song.category === 'object' ? (song.category as any).name : undefined,
    keywords: song.tags.join(','),
    author: {
      '@type': 'Person',
      name: 'Sathvik KV',
      url: 'https://sargamkeys.in/about',
      jobTitle: 'Founder & Pianist',
      knowsAbout: ['Piano', 'Music Theory', 'Sargam Notes'],
      sameAs: [
        'https://www.youtube.com/@Sathvik_Keys'
      ]
    }
  };

  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: `${song.title} Piano Notes`,
    description: song.seoDescription,
    image: song.thumbnail || 'https://sargamkeys.in/logo.jpg',
    author: {
      '@type': 'Person',
      name: 'Sathvik KV',
      url: 'https://sargamkeys.in/about'
    },
    publisher: {
      '@type': 'Organization',
      name: 'SargamKeys',
      logo: {
        '@type': 'ImageObject',
        url: 'https://sargamkeys.in/logo.jpg'
      }
    },
    datePublished: song.createdAt,
    dateModified: song.updatedAt
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://sargamkeys.in'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Notes',
        item: 'https://sargamkeys.in/notes'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: song.title,
        item: `https://sargamkeys.in/notes/${song.slug}`
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* JSON-LD for SEO */}
      <script
        id={`breadcrumb-jsonld-${song._id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id={`song-jsonld-${song._id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        id={`article-jsonld-${song._id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      {/* Breadcrumbs for SEO and Navigation */}
      <Breadcrumbs className="mb-8" />

      {/* Analytics Tracking */}
      <AnalyticsTracker songId={song._id.toString()} />

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
          <Image 
            src="/logo.jpg" 
            alt="SargamKeys" 
            width={32}
            height={32}
            className="object-contain" 
          />
          <h1 className="text-2xl font-bold m-0">SargamKeys</h1>
        </div>
        <p className="text-sm">Learn Piano Notes & Music Theory • www.sargamkeys.in</p>
        <div className="mt-4 text-xl font-bold">{song.title}</div>
      </div>

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

          {/* About the Author */}
          <section className="rounded-3xl border-2 border-blue-100 dark:border-blue-900/30 bg-blue-50/50 dark:bg-blue-900/10 p-8 md:p-10">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white dark:bg-slate-800 shadow-xl overflow-hidden shrink-0 border-4 border-white dark:border-slate-800 relative">
                <Image 
                  src="/logo.jpg" 
                  alt="Sathvik KV" 
                  fill
                  className="object-cover" 
                />
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black tracking-tight">About the Author</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-xs">Sathvik KV • Founder of SargamKeys</p>
                </div>
                <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                  Sathvik KV is a self-taught pianist from India with over 10 years of piano-playing experience. He is the founder of SargamKeys, where he publishes piano notes and keyboard notations for popular songs. He also runs the Sathvik Keys YouTube channel, sharing piano-related content with music learners and enthusiasts.
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <Button asChild variant="outline" size="sm" className="rounded-full gap-2 border-blue-200 dark:border-blue-800 hover:bg-blue-600 hover:text-white transition-all">
                    <Link href="https://www.youtube.com/@Sathvik_Keys" target="_blank">
                      <Play className="h-4 w-4" />
                      YouTube Channel
                    </Link>
                  </Button>
                  <Button asChild variant="ghost" size="sm" className="rounded-full gap-2 hover:bg-blue-100 dark:hover:bg-blue-900/30">
                    <Link href="/about">
                      Full Story
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Comment Section */}
          <CommentSection songId={song._id} isAdmin={isAdmin} />
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="sticky top-24 space-y-8">
            {/* Music Theory Recommendations */}
            <Card className="border-blue-200 bg-blue-50/30 dark:border-blue-900/30 dark:bg-blue-900/10">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5 text-blue-600" />
                  Master the Theory
                </CardTitle>
                <CardDescription>
                  Improve your playing with these related lessons
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {getTheoryRecommendations(song).map((theory) => (
                  <Link 
                    key={theory.id} 
                    href={`/music-theory/${theory.id}`}
                    className="group block rounded-lg border bg-card p-3 transition-all hover:border-blue-400 hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold group-hover:text-blue-600">{theory.title}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-blue-600 transition-transform group-hover:translate-x-1" />
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{theory.description}</p>
                  </Link>
                ))}
                <Button asChild variant="outline" className="w-full mt-2 border-blue-200 hover:bg-blue-50">
                  <Link href="/music-theory">View Full Course</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Automated Internal Linking System */}
      <Separator className="my-16" />
      <RelatedSongs song={song} />
    </div>
  );
}
