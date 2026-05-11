import { Metadata } from 'next';
import { Suspense } from 'react';
import { SearchPageClient } from '@/components/search/SearchPageClient';

export const metadata: Metadata = {
  title: 'Search Piano Notes | Bollywood & Hindi Songs | SargamKeys',
  description: 'Search for piano notes of your favorite Bollywood, Pop, and Classical songs. Filter by difficulty, category, and scale.',
  alternates: {
    canonical: '/search',
  },
};

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="h-8 w-64 bg-muted animate-pulse rounded mb-4" />
        <div className="h-4 w-96 bg-muted animate-pulse rounded mb-8" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 mb-8">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-11 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    }>
      <SearchPageClient />
    </Suspense>
  );
}
