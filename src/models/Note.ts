import mongoose, { Document, Schema } from 'mongoose';
import { Note as NoteType } from '@/types';

interface INoteDocument extends Omit<NoteType, '_id'>, Document {}

const noteSchema = new Schema<INoteDocument>(
  {
    title: {
      type: String,
      required: [true, 'Note title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['scales', 'chords', 'progressions', 'techniques', 'music-theory'],
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['beginner', 'intermediate', 'advanced'],
      default: 'beginner',
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for performance
noteSchema.index({ category: 1, difficulty: 1 });

const NoteModel =
  mongoose.models.Note || mongoose.model<INoteDocument>('Note', noteSchema);

export default NoteModel;
