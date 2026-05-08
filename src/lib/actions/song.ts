'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { cache } from 'react';
import { connectDB } from '@/lib/db';
import Song from '@/models/Song';
import Category from '@/models/Category';
import { Song as SongType, APIResponse } from '@/types';
import { slugify } from '@/lib/utils';

export async function createSong(data: Partial<SongType>): Promise<APIResponse<SongType>> {
  try {
    await connectDB();
    
    if (!data.title) throw new Error('Title is required');
    
    const slug = data.slug || slugify(data.title);
    
    const song = await Song.create({
      ...data,
      slug,
    });

    revalidatePath('/');
    revalidatePath('/notes');
    revalidatePath('/admin/songs');
    
    return { success: true, data: JSON.parse(JSON.stringify(song)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateSong(id: string, data: Partial<SongType>): Promise<APIResponse<SongType>> {
  try {
    await connectDB();
    
    if (data.title && !data.slug) {
      data.slug = slugify(data.title);
    }
    
    const song = await Song.findByIdAndUpdate(id, data, { new: true }).populate('category');
    
    if (!song) throw new Error('Song not found');

    revalidatePath(`/notes/${song.slug}`);
    revalidatePath('/');
    revalidatePath('/notes');
    revalidatePath('/sitemap.xml');
    if (song.category) {
      const categorySlug = typeof song.category === 'object' ? (song.category as any).slug : null;
      if (categorySlug) {
        revalidatePath(`/categories/${categorySlug}`);
      }
    }
    revalidatePath('/admin/songs');
    
    return { success: true, data: JSON.parse(JSON.stringify(song)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteSong(id: string): Promise<APIResponse<void>> {
  try {
    await connectDB();
    const song = await Song.findByIdAndDelete(id);
    
    if (!song) throw new Error('Song not found');

    revalidatePath('/');
    revalidatePath('/notes');
    revalidatePath('/admin/songs');
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSongs(query: any = {}, options: any = {}): Promise<APIResponse<{ songs: SongType[], total: number }>> {
  try {
    await connectDB();
    
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;
    
    const [songs, total] = await Promise.all([
      Song.find(query)
        .sort(options.sort || { createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('category'),
      Song.countDocuments(query),
    ]);
    
    return { 
      success: true, 
      data: { 
        songs: JSON.parse(JSON.stringify(songs)), 
        total 
      } 
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getSongById(id: string): Promise<APIResponse<SongType>> {
  try {
    await connectDB();
    const song = await Song.findById(id).populate('category');
    
    if (!song) throw new Error('Song not found');
    
    return { success: true, data: JSON.parse(JSON.stringify(song)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export const getSongBySlug = cache(async (slug: string, isAdmin: boolean = false): Promise<APIResponse<SongType>> => {
  try {
    await connectDB();
    const query = isAdmin ? { slug } : { slug, status: 'Published' };
    const song = await Song.findOne(query).populate('category');
    
    if (!song) throw new Error('Song not found');
    
    // Increment views only if not admin previewing
    if (!isAdmin) {
      song.views += 1;
      await song.save();
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(song)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
});
