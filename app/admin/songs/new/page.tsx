import { SongForm } from '@/components/admin/SongForm';
import { getCategories } from '@/lib/actions/category';

export default async function NewSongPage() {
  const categoriesResponse = await getCategories();
  const categories = categoriesResponse.success ? categoriesResponse.data || [] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Add New Song</h1>
        <p className="text-muted-foreground">Create a new piano notes entry.</p>
      </div>
      <SongForm categories={categories} />
    </div>
  );
}
