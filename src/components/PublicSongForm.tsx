'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Category } from '@/types';
import { createSong } from '@/lib/actions/song';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';
import { Music, Send, Info } from 'lucide-react';

const songSchema = z.object({
  title: z.string().min(2, 'Title must be at least 2 characters'),
  movie: z.string().optional(),
  singer: z.string().optional(),
  notes: z.string().min(10, 'Notes must be at least 10 characters'),
  difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
  category: z.string().min(1, 'Category is required'),
});

interface PublicSongFormProps {
  categories: Category[];
}

export function PublicSongForm({ categories }: PublicSongFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(songSchema),
    defaultValues: {
      difficulty: 'Beginner',
      movie: '',
      singer: '',
    },
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      // Default values for public submission
      const submissionData = {
        ...data,
        status: 'Draft',
        featured: false,
        scale: 'Unknown', // Admin will set this
        key: 'Unknown',   // Admin will set this
        tags: ['User Submission'],
      };

      const response = await createSong(submissionData);

      if (response.success) {
        toast.success('Notes submitted successfully!', {
          description: "Our team will review and publish them soon."
        });
        router.push('/notes');
        router.refresh();
      } else {
        toast.error(response.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error('An error occurred while submitting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto space-y-8">
      <Card className="border-2 border-blue-100 dark:border-blue-900/30 shadow-xl overflow-hidden">
        <div className="bg-blue-600 px-6 py-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
              <Music className="h-8 w-8" />
            </div>
            <div>
              <CardTitle className="text-2xl md:text-3xl font-black">Submit Piano Notes</CardTitle>
              <CardDescription className="text-blue-100 mt-1">Share your musical knowledge with the world.</CardDescription>
            </div>
          </div>
        </div>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Song Title *</label>
              <Input 
                {...register('title')} 
                placeholder="e.g. Tum Hi Ho" 
                className="h-12 border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
              {errors.title && <p className="text-xs text-red-500 font-medium">{errors.title.message as string}</p>}
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Category *</label>
              <Select {...register('category')} className="h-12 border-slate-200">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
              {errors.category && <p className="text-xs text-red-500 font-medium">{errors.category.message as string}</p>}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Movie / Album</label>
              <Input 
                {...register('movie')} 
                placeholder="e.g. Aashiqui 2" 
                className="h-12 border-slate-200"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Singer</label>
              <Input 
                {...register('singer')} 
                placeholder="e.g. Arijit Singh" 
                className="h-12 border-slate-200"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Difficulty Level</label>
            <div className="grid grid-cols-3 gap-3">
              {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
                <label 
                  key={level}
                  className={`flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer transition-all ${
                    watch('difficulty') === level 
                    ? 'border-blue-600 bg-blue-50 text-blue-600 dark:bg-blue-900/20' 
                    : 'border-slate-100 dark:border-slate-800 hover:border-blue-200'
                  }`}
                >
                  <input 
                    type="radio" 
                    value={level} 
                    {...register('difficulty')} 
                    className="sr-only"
                  />
                  <span className="font-bold text-sm uppercase">{level}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold uppercase tracking-wider text-slate-500">Piano Notes *</label>
              <span className="text-[10px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded font-bold uppercase tracking-widest">Sargam or Western</span>
            </div>
            <Textarea 
              {...register('notes')} 
              placeholder="C D E F G A B or Sa Re Ga Ma Pa..." 
              className="min-h-[250px] font-mono text-lg p-6 border-slate-200 focus:border-blue-500 rounded-2xl bg-slate-50/50 dark:bg-slate-900/50" 
            />
            {errors.notes && <p className="text-xs text-red-500 font-medium">{errors.notes.message as string}</p>}
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900/30 rounded-2xl p-4 flex gap-3 text-amber-800 dark:text-amber-200 text-sm">
            <Info className="h-5 w-5 shrink-0" />
            <p>Your submission will be reviewed by our team before going live. Make sure the notes are accurate and well-formatted.</p>
          </div>

          <Button 
            type="submit" 
            className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xl gap-2 shadow-xl shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]" 
            disabled={loading}
          >
            {loading ? 'Submitting...' : (
              <>
                <Send className="h-5 w-5" />
                Submit for Approval
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
