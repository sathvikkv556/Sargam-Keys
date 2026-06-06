import Link from 'next/link';
import { Song, Category } from '@/types';
import { getRelatedSongsByCriteria } from '@/lib/actions/song';
import { SongCard } from './SongCard';
import { Music, Mic, User, Layers, Gauge } from 'lucide-react';

interface RelatedSongsProps {
  song: Song;
}

export async function RelatedSongs({ song }: RelatedSongsProps) {
  const categoryId = typeof song.category === 'object' 
    ? (song.category as Category)._id 
    : song.category;
    
  const categoryName = typeof song.category === 'object'
    ? (song.category as Category).name
    : 'this category';

  const response = await getRelatedSongsByCriteria(song._id, {
    scale: song.scale,
    singer: song.singer,
    composer: song.composer,
    category: categoryId,
    difficulty: song.difficulty
  });

  if (!response.success || !response.data) return null;

  const { byScale, bySinger, byComposer, byCategory, byDifficulty } = response.data;

  // Filter out criteria that didn't return any songs
  const sections = [
    { title: `More ${song.scale} Songs`, icon: <Music className="h-5 w-5" />, songs: byScale, href: `/notes?scale=${song.scale}` },
    { title: `Songs by ${song.singer}`, icon: <Mic className="h-5 w-5" />, songs: bySinger, href: `/notes?singer=${song.singer}` },
    { title: `Composed by ${song.composer}`, icon: <User className="h-5 w-5" />, songs: byComposer, href: `/notes?composer=${song.composer}` },
    { title: `More in ${categoryName}`, icon: <Layers className="h-5 w-5" />, songs: byCategory, href: `/categories/${typeof song.category === 'object' ? (song.category as Category).slug : ''}` },
    { title: `Other ${song.difficulty} Notes`, icon: <Gauge className="h-5 w-5" />, songs: byDifficulty, href: `/notes?difficulty=${song.difficulty}` },
  ].filter(section => section.songs && section.songs.length > 0);

  if (sections.length === 0) return null;

  return (
    <div className="space-y-16 py-12">
      {sections.map((section, idx) => (
        <section key={idx} className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                {section.icon}
              </div>
              <h2 className="text-2xl font-black tracking-tight">{section.title}</h2>
            </div>
            <Link 
              href={section.href} 
              className="text-sm font-bold text-blue-600 hover:underline flex items-center gap-1"
            >
              See All
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {section.songs!.map((s) => (
              <SongCard key={s._id} song={s} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
