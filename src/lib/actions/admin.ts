'use server';

import { connectDB } from '@/lib/db';
import Song from '@/models/Song';
import Category from '@/models/Category';
import User from '@/models/User';

export async function getAdminStats() {
  try {
    await connectDB();
    
    const [
      totalSongs,
      totalCategories,
      totalViews,
      latestSongs,
    ] = await Promise.all([
      Song.countDocuments(),
      Category.countDocuments(),
      Song.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
      Song.find().sort({ createdAt: -1 }).limit(5).populate('category'),
    ]);

    return {
      success: true,
      data: {
        totalSongs,
        totalCategories,
        totalViews: totalViews[0]?.total || 0,
        latestSongs: JSON.parse(JSON.stringify(latestSongs)),
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
