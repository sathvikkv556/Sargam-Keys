import { SongForm } from '@/components/admin/SongForm';
import { getCategories } from '@/lib/actions/category';
import { getSongById } from '@/lib/actions/song';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSongPage({ params }: PageProps) {
  const { id } = await params;
  
  const [songResponse, categoriesResponse] = await Promise.all([
    getSongById(id),
    getCategories(),
  ]);

  if (!songResponse.success || !songResponse.data) {
    notFound();
  }

  const song = songResponse.data;
  const categories = categoriesResponse.success ? categoriesResponse.data || [] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edit Song</h1>
        <p className="text-muted-foreground">Modify the piano notes or metadata for this song.</p>
      </div>
      <SongForm initialData={song} categories={categories} />
    </div>
  );
}
