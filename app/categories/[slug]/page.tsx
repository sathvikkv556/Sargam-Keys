import { getSongs } from '@/lib/actions/song';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import { SongCard } from '@/components/SongCard';
import { notFound } from 'next/navigation';
import { Music } from 'lucide-react';
import { Metadata } from 'next';
import { createPageMetadata } from '@/lib/seo';

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
    `${category.name} Piano Notes`,
    category.description || `Explore the best piano notes for ${category.name} songs. Complete library of notes, chords and scales.`,
    [category.name, 'piano notes', 'music theory'],
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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Music className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">
              {category.name} Piano Notes
            </h1>
            <p className="text-muted-foreground">{category.description || `Explore the best piano notes for ${category.name} songs.`}</p>
          </div>
        </div>
      </div>

      {songs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {songs.map((song) => (
            <SongCard key={song._id} song={song} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Music className="mb-4 h-12 w-12 text-muted-foreground" />
          <h2 className="text-2xl font-bold">No songs found</h2>
          <p className="text-muted-foreground">We haven't added any songs to this category yet. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
