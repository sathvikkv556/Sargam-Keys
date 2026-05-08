'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Song, Category } from '@/types';
import { createSong, updateSong } from '@/lib/actions/song';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { ImageUpload } from './ImageUpload';

const songSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  movie: z.string().optional(),
  singer: z.string().optional(),
  album: z.string().optional(),
  composer: z.string().optional(),
  lyrics: z.string().min(10, 'Lyrics must be at least 10 characters'),
  notes: z.string().min(10, 'Notes must be at least 10 characters'),
  chords: z.string().optional(),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  scale: z.string().min(1, 'Scale is required'),
  key: z.string().min(1, 'Key is required'),
  category: z.string().min(1, 'Category is required'),
  tags: z.string().transform((val) => val.split(',').map((t) => t.trim())),
  thumbnail: z.string().optional(),
  status: z.enum(['Draft', 'Published']),
  featured: z.boolean().default(false),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
});

interface SongFormProps {
  initialData?: Song;
  categories: Category[];
}

export function SongForm({ initialData, categories }: SongFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(songSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          category: typeof initialData.category === 'object' ? (initialData.category as any)._id : initialData.category,
          tags: initialData.tags.join(', '),
        }
      : {
          difficulty: 'Beginner',
          status: 'Draft',
          featured: false,
          thumbnail: '',
          chords: '',
        },
  });

  const thumbnail = watch('thumbnail');

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = initialData
        ? await updateSong(initialData._id, data)
        : await createSong(data);

      if (response.success) {
        toast.success(initialData ? 'Song updated successfully' : 'Song created successfully');
        router.push('/admin/songs');
        router.refresh();
      } else {
        toast.error(response.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Song Thumbnail</label>
                <ImageUpload
                  value={thumbnail || ''}
                  onChange={(url) => setValue('thumbnail', url)}
                  onRemove={() => setValue('thumbnail', '')}
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Song Title</label>
                <Input {...register('title')} placeholder="e.g. Tum Hi Ho" />
                {errors.title && <p className="text-xs text-red-500">{errors.title.message as string}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Movie</label>
                  <Input {...register('movie')} placeholder="e.g. Aashiqui 2" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Album</label>
                  <Input {...register('album')} placeholder="e.g. Singles 2024" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Singer</label>
                  <Input {...register('singer')} placeholder="e.g. Arijit Singh" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Composer</label>
                  <Input {...register('composer')} placeholder="e.g. Mithoon" />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Lyrics</label>
                <Textarea {...register('lyrics')} placeholder="Paste lyrics here..." className="min-h-[150px]" />
                {errors.lyrics && <p className="text-xs text-red-500">{errors.lyrics.message as string}</p>}
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Piano Notes</label>
                <Textarea {...register('notes')} placeholder="Paste piano notes here..." className="min-h-[200px] font-mono" />
                {errors.notes && <p className="text-xs text-red-500">{errors.notes.message as string}</p>}
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Guitar/Piano Chords (Optional)</label>
                <Textarea {...register('chords')} placeholder="Paste chords here..." className="min-h-[100px] font-mono" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">SEO Title</label>
                <Input {...register('seoTitle')} placeholder="Meta title for search engines" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">SEO Description</label>
                <Textarea {...register('seoDescription')} placeholder="Meta description for search engines" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Attributes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium">Category</label>
                <Select {...register('category')}>
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </Select>
                {errors.category && <p className="text-xs text-red-500">{errors.category.message as string}</p>}
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Difficulty</label>
                <Select {...register('difficulty')}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Scale</label>
                  <Input {...register('scale')} placeholder="e.g. C Major" />
                </div>
                <div className="grid gap-2">
                  <label className="text-sm font-medium">Key</label>
                  <Input {...register('key')} placeholder="e.g. C" />
                </div>
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Tags (comma separated)</label>
                <Input {...register('tags')} placeholder="bollywood, arijit singh, sad" />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Status</label>
                <Select {...register('status')}>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </Select>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" {...register('featured')} id="featured" className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="featured" className="text-sm font-medium cursor-pointer">Featured Song</label>
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Saving...' : initialData ? 'Update Song' : 'Publish Song'}
          </Button>
          <Button type="button" variant="outline" className="w-full" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  );
}
