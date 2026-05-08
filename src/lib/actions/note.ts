'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db';
import NoteModel from '@/models/Note';
import { Note as NoteType, APIResponse } from '@/types';

export async function getNotes(query: any = {}, options: any = {}): Promise<APIResponse<{ notes: NoteType[], total: number }>> {
  try {
    await connectDB();
    
    const page = options.page || 1;
    const limit = options.limit || 10;
    const skip = (page - 1) * limit;
    
    const [notes, total] = await Promise.all([
      NoteModel.find(query)
        .sort(options.sort || { createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      NoteModel.countDocuments(query),
    ]);
    
    return { 
      success: true, 
      data: { 
        notes: JSON.parse(JSON.stringify(notes)) as NoteType[], 
        total 
      } 
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getNoteById(id: string): Promise<APIResponse<NoteType>> {
  try {
    await connectDB();
    const note = await NoteModel.findById(id).lean();
    
    if (!note) throw new Error('Note not found');
    
    return { success: true, data: JSON.parse(JSON.stringify(note)) as NoteType };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function createNote(data: Partial<NoteType>): Promise<APIResponse<NoteType>> {
  try {
    await connectDB();
    const note = await NoteModel.create(data);
    revalidatePath('/notes');
    return { success: true, data: JSON.parse(JSON.stringify(note)) as NoteType };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
