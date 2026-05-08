// Type definitions for piano notes

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced';
export type SongStatus = 'Draft' | 'Published';

export interface Note {
  _id: string;
  title: string;
  description: string;
  content: string;
  category: 'scales' | 'chords' | 'progressions' | 'techniques' | 'music-theory';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  createdAt: string;
  updatedAt: string;
}

export interface Song {
  _id: string;
  title: string;
  slug: string;
  movie?: string;
  album?: string;
  singer?: string;
  composer?: string;
  lyrics: string;
  notes: string;
  chords?: string;
  difficulty: Difficulty;
  scale: string;
  key: string;
  category: string | Category;
  tags: string[];
  thumbnail?: string;
  views: number;
  status: SongStatus;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  featured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'admin' | 'editor';
  image?: string;
  createdAt: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationData {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
