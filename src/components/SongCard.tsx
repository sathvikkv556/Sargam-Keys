import Link from 'next/link';
import Image from 'next/image';
import { Song, Category } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Music } from 'lucide-react';
import { TiltCard } from '@/components/ui/TiltCard';

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: SongCardProps) {
  if (!song) return null;
  
  const categoryName = (song.category && typeof song.category === 'object') 
    ? (song.category as Category).name 
    : 'Uncategorized';
  
  return (
    <TiltCard>
      <Card className="overflow-hidden transition-all hover:shadow-2xl group border-muted h-full bg-card/50 backdrop-blur-sm">
        <Link 
          href={`/notes/${song.slug}`}
          className="block focus-visible:outline-2 focus-visible:outline-blue-600 focus-visible:outline-offset-2"
          aria-label={`View piano notes for ${song.title}`}
        >
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            {song.thumbnail ? (
              <Image
                src={song.thumbnail}
                alt={`Sheet music preview for ${song.title}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <Music className="h-10 w-10 text-muted-foreground" aria-hidden="true" />
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm dark:bg-black/80 font-bold">
                {song.difficulty}
              </Badge>
            </div>
          </div>
        </Link>
        <CardContent className="p-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest">
              {categoryName}
            </span>
          </div>
          <Link href={`/notes/${song.slug}`} className="group/title">
            <h3 className="line-clamp-1 text-lg font-black group-hover/title:text-blue-600 transition-colors tracking-tight">
              {song.title}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-1 text-sm text-slate-500 dark:text-slate-400 font-medium">
            {song.movie || song.singer || 'Piano Notes'}
          </p>
          <div className="mt-4 flex flex-wrap gap-1.5" aria-label="Tags">
            {song.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-bold">
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </TiltCard>
  );
}
