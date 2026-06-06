import { getCategories } from '@/lib/actions/category';
import { PublicSongForm } from '@/components/PublicSongForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit Piano Notes - SargamKeys',
  description: 'Contribute your piano notes to the SargamKeys community. Share Bollywood, Pop, or Classical song notes.',
};

export default async function SubmitNotesPage() {
  const categoriesResponse = await getCategories();
  const categories = categoriesResponse.success ? categoriesResponse.data || [] : [];

  return (
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-3xl mx-auto mb-12 text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">Contribute Notes</h1>
        <p className="text-xl text-muted-foreground">Help other piano enthusiasts by sharing your favorite song notes.</p>
      </div>
      <PublicSongForm categories={categories} />
    </div>
  );
}
