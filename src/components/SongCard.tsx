'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Song, Category } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Music } from 'lucide-react';
import { motion } from 'framer-motion';

interface SongCardProps {
  song: Song;
}

export function SongCard({ song }: SongCardProps) {
  if (!song) return null;
  
  const categoryName = (song.category && typeof song.category === 'object') 
    ? (song.category as Category).name 
    : 'Uncategorized';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-xl group border-muted h-full">
        <Link href={`/notes/${song.slug}`}>
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            {song.thumbnail ? (
              <Image
                src={song.thumbnail}
                alt={song.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <Music className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
            <div className="absolute top-2 right-2">
              <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm dark:bg-black/80">
                {song.difficulty}
              </Badge>
            </div>
          </div>
        </Link>
        <CardContent className="p-4">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
              {categoryName}
            </span>
          </div>
          <Link href={`/notes/${song.slug}`}>
            <h3 className="line-clamp-1 text-lg font-bold group-hover:text-primary transition-colors">
              {song.title}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
            {song.movie || song.singer || 'Piano Notes'}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {song.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
