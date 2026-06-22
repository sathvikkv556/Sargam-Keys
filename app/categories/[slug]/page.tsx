import { getSongs } from '@/lib/actions/song';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import { SongCard } from '@/components/SongCard';
import { notFound } from 'next/navigation';
import { Music } from 'lucide-react';
import { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Separator } from '@/components/ui/separator';
import { PageAdLayout } from '@/components/common/AdPlacements';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  await connectDB();
  const category = await Category.findOne({ slug });

  if (!category) {
    return { title: 'Category Not Found' };
  }

  return createPageMetadata(
    `${category.name} Piano Notes | Sargam & Keyboard Notations`,
    category.description || `Explore the best piano notes for ${category.name} songs. Complete library of notes, chords, and Sargam notations at SargamKeys.`,
    [category.name, 'piano notes', 'music theory', 'sargam notes', 'keyboard notes'],
    `/categories/${category.slug}`
  );
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  
  await connectDB();
  const category = await Category.findOne({ slug });

  if (!category) {
    notFound();
  }

  const response = await getSongs(
    { category: category._id, status: 'Published' },
    { sort: { createdAt: -1 }, limit: 20 }
  );

  const songs = response.success ? response.data?.songs || [] : [];

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
        name: 'Categories',
        item: 'https://sargamkeys.in/categories'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: category.name,
        item: `https://sargamkeys.in/categories/${category.slug}`
      }
    ]
  };

  const itemListJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: songs.map((song, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `https://sargamkeys.in/notes/${song.slug}`,
      name: song.title
    }))
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* JSON-LD for SEO */}
      <script
        id={`breadcrumb-jsonld-${category._id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        id={`itemlist-jsonld-${category._id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      
      <Breadcrumbs className="mb-12" />
      <PageAdLayout>
        <div className="mb-16 max-w-4xl">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-600/20">
              <Music className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-black tracking-tight md:text-6xl text-slate-900 dark:text-white">
                {category.name} Piano Notes
              </h1>
              <p className="text-xl text-muted-foreground font-medium leading-relaxed">{category.description || `Explore the best piano notes for ${category.name} songs. Learn to play your favorite hits on keyboard with our accurate notations.`}</p>
            </div>
          </div>
        </div>

        <Separator className="mb-12" />

        {songs.length > 0 ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {songs.map((song) => (
              <SongCard key={song._id} song={song} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Music className="mb-4 h-12 w-12 text-muted-foreground" />
            <h2 className="text-2xl font-bold">No songs found</h2>
            <p className="text-muted-foreground">We haven&apos;t added any songs to this category yet. Check back soon!</p>
          </div>
        )}
      </PageAdLayout>
    </div>
  );
}
