import mongoose, { Document, Schema } from 'mongoose';

export interface ISong extends Document {
  title: string;
  slug: string;
  movie?: string;
  album?: string;
  singer?: string;
  composer?: string;
  lyrics?: string;
  notes: string;
  chords?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  scale: string;
  key: string;
  category: mongoose.Types.ObjectId;
  tags: string[];
  thumbnail?: string;
  views: number;
  status: 'Draft' | 'Published';
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const songSchema = new Schema<ISong>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, index: true },
    movie: { type: String, trim: true },
    album: { type: String, trim: true },
    singer: { type: String, trim: true },
    composer: { type: String, trim: true },
    lyrics: { type: String },
    notes: { type: String, required: true },
    chords: { type: String },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    scale: { type: String, required: true },
    key: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [{ type: String }],
    thumbnail: { type: String },
    views: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      default: 'Draft',
    },
    seoTitle: { type: String },
    seoDescription: { type: String },
    seoKeywords: [{ type: String }],
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Search indexing
songSchema.index({ title: 'text', movie: 'text', singer: 'text', tags: 'text' });

export default mongoose.models.Song || mongoose.model<ISong>('Song', songSchema);
