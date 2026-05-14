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
    
    // Increment views only if not admin previewing AND in production
    if (!isAdmin && process.env.NODE_ENV === 'production') {
      try {
        const headersList = await headers();
        const host = headersList.get('host') || '';
        
        // Strictly exclude localhost/127.0.0.1 to avoid polluting production data
        const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1');

        if (!isLocalhost) {
          // Increment global counter
          song.views += 1;
          await song.save();

          // Log individual view for analytics
          const ip = headersList.get('x-forwarded-for') || 'unknown';
          const userAgent = headersList.get('user-agent') || 'unknown';
          const referrer = headersList.get('referer') || 'direct';
          
          // Categorize source
          let source = 'direct';
          if (referrer && referrer !== 'direct') {
            const refLower = referrer.toLowerCase();
            if (refLower.includes('google.com')) {
              source = 'google';
            } else if (refLower.includes('facebook.com') || refLower.includes('fb.me')) {
              source = 'facebook';
            } else if (refLower.includes('twitter.com') || refLower.includes('t.co') || refLower.includes('x.com')) {
              source = 'twitter';
            } else if (refLower.includes('youtube.com')) {
              source = 'youtube';
            } else if (refLower.includes(process.env.NEXT_PUBLIC_APP_URL || '')) {
              source = 'internal';
            } else {
              source = 'other';
            }
          }

          await Analytics.create({
            songId: song._id,
            ip,
            userAgent,
            referrer,
            source,
          });
        }
      } catch (saveError) {
        console.error('Error incrementing views or logging analytics:', saveError);
        // Don't fail the whole request if view increment fails
      }
    }
    
    return { success: true, data: JSON.parse(JSON.stringify(song)) };
  } catch (error: any) {
    console.error('getSongBySlug error:', error);
    return { success: false, error: error.message };
  }
});
