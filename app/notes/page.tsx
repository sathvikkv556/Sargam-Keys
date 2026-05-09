import { getSongs } from '@/lib/actions/song';
import { getNotes } from '@/lib/actions/note';
import { SongCard } from '@/components/SongCard';
import { NoteCard } from '@/components/cards/NoteCard';
import { Button } from '@/components/ui/button';
import { Music, BookOpen, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Piano Notes Library | Bollywood, Pop & Classical | SargamKeys',
  description: 'Browse our extensive library of piano notes and music theory guides. Learn to play your favorite songs with ease.',
  alternates: {
    canonical: '/notes',
  },
};

export default async function AllNotesPage() {
  const [songsResponse, notesResponse] = await Promise.all([
    getSongs({ status: 'Published' }, { limit: 20 }),
    getNotes({}, { limit: 12 }),
  ]);

  const songs = songsResponse.success ? songsResponse.data?.songs || [] : [];
  const notes = notesResponse.success ? notesResponse.data?.notes || [] : [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Library</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore piano notes for songs and master music theory.
          </p>
        </div>
      </div>

      <Tabs defaultValue="songs" className="space-y-8">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="songs" className="gap-2">
            <Music className="h-4 w-4" />
            Song Notes
          </TabsTrigger>
          <TabsTrigger value="theory" className="gap-2">
            <BookOpen className="h-4 w-4" />
            Music Theory
          </TabsTrigger>
        </TabsList>

        <TabsContent value="songs" className="space-y-8">
          {songs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {songs.map((song) => (
                <SongCard key={song._id} song={song} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border rounded-3xl bg-muted/20">
              <Music className="mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="text-2xl font-bold">No songs found</h2>
              <p className="text-muted-foreground">Check back later for new piano notes.</p>
            </div>
          )}
          
          {songs.length > 0 && (
            <div className="flex justify-center">
              <Button variant="outline">Load More Songs</Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="theory" className="space-y-8">
          {notes.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {notes.map((note) => (
                <NoteCard key={note._id} note={note} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-center border rounded-3xl bg-muted/20">
              <Sparkles className="mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="text-2xl font-bold">Theory guides coming soon</h2>
              <p className="text-muted-foreground">We are working on comprehensive guides for scales and chords.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
