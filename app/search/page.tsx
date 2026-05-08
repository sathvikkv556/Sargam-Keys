'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getSongs } from '@/lib/actions/song';
import { getCategories } from '@/lib/actions/category';
import { Song, Category } from '@/types';
import { SongCard } from '@/components/SongCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { Search as SearchIcon, SlidersHorizontal, Music } from 'lucide-react';
import { Skeleton } from '@/components/common/Skeleton';

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialDifficulty = searchParams.get('difficulty') || '';
  const initialScale = searchParams.get('scale') || '';

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [scale, setScale] = useState(initialScale);
  const [songs, setSongs] = useState<Song[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    async function fetchData() {
      const catRes = await getCategories();
      if (catRes.success) setCategories(catRes.data || []);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function searchSongs() {
      setLoading(true);
      
      const filter: any = { status: 'Published' };
      if (debouncedQuery) {
        filter.$or = [
          { title: { $regex: debouncedQuery, $options: 'i' } },
          { movie: { $regex: debouncedQuery, $options: 'i' } },
          { singer: { $regex: debouncedQuery, $options: 'i' } },
          { tags: { $in: [new RegExp(debouncedQuery, 'i')] } }
        ];
      }
      if (category) filter.category = category;
      if (difficulty) filter.difficulty = difficulty;
      if (scale) filter.scale = { $regex: scale, $options: 'i' };

      const response = await getSongs(filter, { limit: 20 });
      if (response.success) {
        setSongs(response.data?.songs || []);
      }
      setLoading(false);

      // Update URL
      const params = new URLSearchParams();
      if (debouncedQuery) params.set('q', debouncedQuery);
      if (category) params.set('category', category);
      if (difficulty) params.set('difficulty', difficulty);
      if (scale) params.set('scale', scale);
      const newUrl = `/search?${params.toString()}`;
      window.history.replaceState({ path: newUrl }, '', newUrl);
    }

    searchSongs();
  }, [debouncedQuery, category, difficulty, scale]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search Piano Notes</h1>
          <p className="text-muted-foreground">Find notes by song, movie, or singer.</p>
        </div>

        {/* Filters */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 items-end">
          <div className="sm:col-span-2 lg:col-span-2 space-y-2">
            <label className="text-sm font-medium">Search</label>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Song, movie, or singer..." 
                className="pl-9 h-11"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select value={category} onChange={(e) => setCategory(e.target.value)} className="h-11">
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Difficulty</label>
            <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value)} className="h-11">
              <option value="">All Difficulties</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </Select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Scale/Key</label>
            <Select value={scale} onChange={(e) => setScale(e.target.value)} className="h-11">
              <option value="">All Scales</option>
              {['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'].map((s) => (
                <React.Fragment key={s}>
                  <option value={`${s} Major`}>{s} Major</option>
                  <option value={`${s} Minor`}>{s} Minor</option>
                </React.Fragment>
              ))}
            </Select>
          </div>
        </div>

        {/* Results */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {loading ? 'Searching...' : `${songs.length} Results found`}
            </h2>
            <Button variant="ghost" onClick={() => {
              setQuery('');
              setCategory('');
              setDifficulty('');
              setScale('');
            }} className="text-xs">Reset Filters</Button>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="aspect-video w-full rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : songs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {songs.map((song) => (
                <SongCard key={song._id} song={song} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                <Music className="h-10 w-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold">No songs found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters.</p>
              <Button className="mt-6" onClick={() => setQuery('')}>Clear Search</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div>Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
