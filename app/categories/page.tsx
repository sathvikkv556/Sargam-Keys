import { getCategories } from '@/lib/actions/category';
import { Card, CardContent } from '@/components/ui/card';
import { Music, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Piano Note Categories | Raagakeys',
  description: 'Browse piano notes by category - Bollywood, Classical, Pop, Devotional and more.',
};

export default async function CategoriesPage() {
  const response = await getCategories();
  const categories = response.success ? response.data || [] : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Browse by Category</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Find your favorite songs organized by genre and style.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((category) => (
          <Link key={category._id} href={`/categories/${category.slug}`} className="group">
            <Card className="h-full transition-all hover:border-primary hover:shadow-lg">
              <CardContent className="flex flex-col items-center justify-center p-8 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Music className="h-8 w-8" />
                </div>
                <h2 className="text-xl font-bold">{category.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {category.description || `Explore all ${category.name} piano notes.`}
                </p>
                <div className="mt-4 flex items-center text-sm font-medium text-primary">
                  View Songs <ChevronRight className="ml-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
