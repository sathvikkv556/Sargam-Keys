'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ImagePlus, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
}

export function ImageUpload({ value, onChange, onRemove }: ImageUploadProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onUpload = () => {
    // @ts-ignore
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
        maxFiles: 1,
        resourceType: 'image',
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          onChange(result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  if (!mounted) return null;

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-wrap gap-4">
        {value ? (
          <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
            <div className="z-10 absolute top-2 right-2">
              <Button
                type="button"
                onClick={onRemove}
                variant="destructive"
                size="icon"
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Image
              fill
              className="object-cover"
              alt="Song thumbnail"
              src={value}
            />
          </div>
        ) : (
          <div 
            onClick={onUpload}
            className="w-[200px] h-[200px] rounded-md border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors"
          >
            <ImageIcon className="h-10 w-10 text-gray-400 mb-2" />
            <span className="text-sm text-gray-500">Upload Thumbnail</span>
          </div>
        )}
      </div>
      
      {/* Cloudinary Widget Script */}
      <script
        src="https://upload-widget.cloudinary.com/global/all.js"
        type="text/javascript"
        async
      />
    </div>
  );
}
