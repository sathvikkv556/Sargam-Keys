'use server';

import { connectDB } from '@/lib/db';
import Song from '@/models/Song';
import Category from '@/models/Category';
import Analytics from '@/models/Analytics';

export async function getAdminStats() {
  try {
    await connectDB();
    
    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));

    const [
      totalSongs,
      totalCategories,
      totalViewsResult,
      todayViews,
      latestSongs,
    ] = await Promise.all([
      Song.countDocuments(),
      Category.countDocuments(),
      Song.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
      Analytics.countDocuments({ timestamp: { $gte: todayStart } }),
      Song.find().sort({ createdAt: -1 }).limit(5).populate('category'),
    ]);

    return {
      success: true,
      data: {
        totalSongs,
        totalCategories,
        totalViews: totalViewsResult[0]?.total || 0,
        todayViews,
        latestSongs: JSON.parse(JSON.stringify(latestSongs)),
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
