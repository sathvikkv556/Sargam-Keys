'use client';

import { Share2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SongActionsProps {
  title: string;
}

export function SongActions({ title }: SongActionsProps) {
  const handleShare = () => {
    const url = window.location.href;
    const shareUrl = `https://wa.me/?text=Check out these piano notes for ${title}: ${url}`;
    window.open(shareUrl, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="flex items-center gap-2 no-print">
      <Button
        size="sm"
        variant="outline"
        className="bg-[#25D366] text-white hover:bg-[#128C7E] border-none flex items-center gap-2 shadow-sm"
        onClick={handleShare}
      >
        <Share2 className="h-4 w-4" />
        <span className="hidden sm:inline">Share on WhatsApp</span>
        <span className="sm:hidden">WhatsApp</span>
      </Button>
      <Button
        size="sm"
        variant="secondary"
        className="flex items-center gap-2"
        onClick={handleCopyLink}
      >
        <Tag className="h-4 w-4 rotate-90" />
        <span>Copy Link</span>
      </Button>
    </div>
  );
}
