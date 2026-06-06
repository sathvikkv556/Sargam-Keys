'use server';

import { revalidatePath, revalidateTag } from 'next/cache';
import { cache } from 'react';
import { connectDB } from '@/lib/db';
import Song from '@/models/Song';
import Category from '@/models/Category';
import Analytics from '@/models/Analytics';
import { Song as SongType, APIResponse } from '@/types';
import { slugify } from '@/lib/utils';
import { headers } from 'next/headers';

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

export const getSongBySlug = cache(async (slug: string, isAdmin: boolean = false): Promise<APIResponse<SongType> & { notFound?: boolean }> => {
  try {
    await connectDB();
    
    // Normalize slug: remove trailing slashes and convert to lowercase
    const normalizedSlug = slug.replace(/\/$/, '').toLowerCase();
    
    const query = isAdmin ? { slug: normalizedSlug } : { slug: normalizedSlug, status: 'Published' };
    const song = await Song.findOne(query).populate('category');
    
    if (!song) {
      console.log(`Song not found for slug: ${normalizedSlug}`);
      return { success: false, error: 'Song not found', notFound: true };
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(song)) };
  } catch (error: any) {
    console.error('getSongBySlug error:', error);
    return { success: false, error: error.message };
  }
});

/**
 * Fetches related songs based on various criteria for internal linking
 */
export async function getRelatedSongsByCriteria(
  songId: string,
  criteria: {
    scale?: string;
    singer?: string;
    composer?: string;
    category?: string;
    difficulty?: string;
  },
  limit: number = 4
): Promise<APIResponse<Record<string, SongType[]>>> {
  try {
    await connectDB();
    const results: Record<string, SongType[]> = {};
    
    const baseQuery = { 
      _id: { $ne: songId },
      status: 'Published' 
    };

    // Parallel execution for different criteria
    const promises = [];

    if (criteria.scale) {
      promises.push(
        Song.find({ ...baseQuery, scale: criteria.scale })
          .limit(limit)
          .sort({ views: -1 })
          .populate('category')
          .lean()
          .then(data => results.byScale = JSON.parse(JSON.stringify(data)))
      );
    }

    if (criteria.singer) {
      promises.push(
        Song.find({ ...baseQuery, singer: criteria.singer })
          .limit(limit)
          .sort({ views: -1 })
          .populate('category')
          .lean()
          .then(data => results.bySinger = JSON.parse(JSON.stringify(data)))
      );
    }

    if (criteria.composer) {
      promises.push(
        Song.find({ ...baseQuery, composer: criteria.composer })
          .limit(limit)
          .sort({ views: -1 })
          .populate('category')
          .lean()
          .then(data => results.byComposer = JSON.parse(JSON.stringify(data)))
      );
    }

    if (criteria.category) {
      promises.push(
        Song.find({ ...baseQuery, category: criteria.category })
          .limit(limit)
          .sort({ views: -1 })
          .populate('category')
          .lean()
          .then(data => results.byCategory = JSON.parse(JSON.stringify(data)))
      );
    }

    if (criteria.difficulty) {
      promises.push(
        Song.find({ ...baseQuery, difficulty: criteria.difficulty })
          .limit(limit)
          .sort({ views: -1 })
          .populate('category')
          .lean()
          .then(data => results.byDifficulty = JSON.parse(JSON.stringify(data)))
      );
    }

    await Promise.all(promises);

    return { success: true, data: results };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

