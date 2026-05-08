import { getSongs } from '@/lib/actions/song';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { 
  PlusCircle, 
  Search, 
  Edit, 
  ExternalLink 
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { formatDate } from '@/lib/utils';
import { DeleteSongButton } from '@/components/admin/DeleteSongButton';

export default async function AdminSongsPage() {
  const response = await getSongs({}, { limit: 100 });
  const songs = response.success ? response.data?.songs || [] : [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Songs</h1>
          <p className="text-muted-foreground">Add, edit, or remove piano notes from the platform.</p>
        </div>
        <Button asChild>
          <Link href="/admin/songs/new" className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Add New Song
          </Link>
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search songs..." 
            className="pl-9"
          />
        </div>
        <Button variant="outline">Filter</Button>
      </div>

      <div className="rounded-xl border bg-white dark:bg-slate-900 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b bg-slate-50 dark:bg-slate-800 font-medium">
              <tr>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {songs.length > 0 ? (
                songs.map((song) => (
                  <tr key={song._id} className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium">{song.title}</div>
                      <div className="text-xs text-muted-foreground">{song.movie || song.singer || '-'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="outline">
                        {typeof song.category === 'object' ? (song.category as any).name : 'Uncategorized'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={song.status === 'Published' ? 'default' : 'secondary'}>
                        {song.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">{song.views.toLocaleString()}</td>
                    <td className="px-6 py-4 text-muted-foreground">{formatDate(song.createdAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" asChild title="View on site">
                          <Link href={`/notes/${song.slug}`} target="_blank">
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button variant="ghost" size="icon" asChild title="Edit">
                          <Link href={`/admin/songs/${song._id}`}>
                            <Edit className="h-4 w-4 text-blue-600" />
                          </Link>
                        </Button>
                        <DeleteSongButton songId={song._id} songTitle={song.title} />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                    No songs found. Start by adding your first piano notes!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
