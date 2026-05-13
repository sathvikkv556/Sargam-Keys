'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db';
import Comment from '@/models/Comment';
import Song from '@/models/Song';
import { Comment as CommentType, APIResponse } from '@/types';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function createComment(data: {
  songId: string;
  userName: string;
  userEmail?: string;
  content: string;
}): Promise<APIResponse<CommentType>> {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    const isAdmin = (session?.user as any)?.role === 'admin';

    const comment = await Comment.create({
      ...data,
      status: isAdmin ? 'Approved' : 'Pending',
      isAdmin: isAdmin,
    });

    const song = await Song.findById(data.songId);
    if (song) {
      revalidatePath(`/notes/${song.slug}`);
    }
    
    return { 
      success: true, 
      data: JSON.parse(JSON.stringify(comment)),
      message: isAdmin ? 'Comment posted successfully.' : 'Comment submitted and awaiting moderation.' 
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getCommentsBySongId(songId: string, isAdmin: boolean = false): Promise<APIResponse<CommentType[]>> {
  try {
    await connectDB();
    
    const query: any = { songId };
    if (!isAdmin) {
      query.status = 'Approved';
    }

    const comments = await Comment.find(query).sort({ createdAt: -1 });
    
    return { success: true, data: JSON.parse(JSON.stringify(comments)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getAllComments(options: any = {}): Promise<APIResponse<{ comments: CommentType[], total: number }>> {
  try {
    await connectDB();
    
    const page = options.page || 1;
    const limit = options.limit || 20;
    const skip = (page - 1) * limit;
    
    const [comments, total] = await Promise.all([
      Comment.find(options.query || {})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('songId', 'title slug'),
      Comment.countDocuments(options.query || {}),
    ]);
    
    return { 
      success: true, 
      data: { 
        comments: JSON.parse(JSON.stringify(comments)), 
        total 
      } 
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCommentStatus(id: string, status: 'Approved' | 'Spam' | 'Pending'): Promise<APIResponse<CommentType>> {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    const comment = await Comment.findByIdAndUpdate(id, { status }, { new: true }).populate('songId');
    if (!comment) throw new Error('Comment not found');

    if (comment.songId) {
      revalidatePath(`/notes/${(comment.songId as any).slug}`);
    }
    revalidatePath('/admin/comments');
    
    return { success: true, data: JSON.parse(JSON.stringify(comment)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteComment(id: string): Promise<APIResponse<void>> {
  try {
    await connectDB();
    
    const session = await getServerSession(authOptions);
    if ((session?.user as any)?.role !== 'admin') {
      throw new Error('Unauthorized');
    }

    const comment = await Comment.findByIdAndDelete(id).populate('songId');
    if (!comment) throw new Error('Comment not found');

    if (comment.songId) {
      revalidatePath(`/notes/${(comment.songId as any).slug}`);
    }
    revalidatePath('/admin/comments');
    
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
