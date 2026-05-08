'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { deleteSong } from '@/lib/actions/song';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface DeleteSongButtonProps {
  songId: string;
  songTitle: string;
}

export function DeleteSongButton({ songId, songTitle }: DeleteSongButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${songTitle}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await deleteSong(songId);
      if (response.success) {
        toast.success('Song deleted successfully');
        router.refresh();
      } else {
        toast.error(response.error || 'Failed to delete song');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={handleDelete} 
      disabled={loading}
      title="Delete Song"
    >
      <Trash2 className={`h-4 w-4 ${loading ? 'text-gray-400' : 'text-red-600'}`} />
    </Button>
  );
}
