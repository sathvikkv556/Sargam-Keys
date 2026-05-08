'use server';

import { revalidatePath } from 'next/cache';
import { connectDB } from '@/lib/db';
import Category from '@/models/Category';
import { Category as CategoryType, APIResponse } from '@/types';
import { slugify } from '@/lib/utils';

export async function createCategory(data: Partial<CategoryType>): Promise<APIResponse<CategoryType>> {
  try {
    await connectDB();
    
    if (!data.name) throw new Error('Name is required');
    
    const slug = data.slug || slugify(data.name);
    
    const category = await Category.create({
      ...data,
      slug,
    });

    revalidatePath('/');
    revalidatePath('/categories');
    revalidatePath('/admin/categories');
    
    return { success: true, data: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateCategory(id: string, data: Partial<CategoryType>): Promise<APIResponse<CategoryType>> {
  try {
    await connectDB();
    
    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }
    
    const category = await Category.findByIdAndUpdate(id, data, { new: true });
    
    if (!category) throw new Error('Category not found');

    revalidatePath('/');
    revalidatePath('/categories');
    revalidatePath(`/categories/${category.slug}`);
    revalidatePath('/notes');
    revalidatePath('/sitemap.xml');
    revalidatePath('/admin/categories');
    
    return { success: true, data: JSON.parse(JSON.stringify(category)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getCategories(): Promise<APIResponse<CategoryType[]>> {
  try {
    await connectDB();
    const categories = await Category.find().sort({ order: 1, name: 1 });
    return { success: true, data: JSON.parse(JSON.stringify(categories)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
