'use server';

import { connectDB } from '@/lib/db';
import Analytics from '@/models/Analytics';
import Song from '@/models/Song';
import { APIResponse } from '@/types';
import mongoose from 'mongoose';

export async function getOverallStats(): Promise<APIResponse<any>> {
  try {
    await connectDB();

    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisYearStart = new Date(now.getFullYear(), 0, 1);

    const [totalViews, todayViews, monthViews, yearViews] = await Promise.all([
      Analytics.countDocuments({}),
      Analytics.countDocuments({ timestamp: { $gte: todayStart } }),
      Analytics.countDocuments({ timestamp: { $gte: thisMonthStart } }),
      Analytics.countDocuments({ timestamp: { $gte: thisYearStart } }),
    ]);

    return {
      success: true,
      data: {
        totalViews,
        todayViews,
        monthViews,
        yearViews,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getViewsByTimeframe(timeframe: 'day' | 'month' | 'year' = 'day'): Promise<APIResponse<any>> {
  try {
    await connectDB();

    let groupBy: any;
    let limit = 30;

    if (timeframe === 'day') {
      groupBy = {
        year: { $year: '$timestamp' },
        month: { $month: '$timestamp' },
        day: { $dayOfMonth: '$timestamp' },
      };
      limit = 30;
    } else if (timeframe === 'month') {
      groupBy = {
        year: { $year: '$timestamp' },
        month: { $month: '$timestamp' },
      };
      limit = 12;
    } else {
      groupBy = {
        year: { $year: '$timestamp' },
      };
      limit = 5;
    }

    const stats = await Analytics.aggregate([
      {
        $group: {
          _id: groupBy,
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
      { $limit: limit },
    ]);

    return { success: true, data: stats.reverse() };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getHourlyStatsToday(): Promise<APIResponse<any>> {
  try {
    await connectDB();

    const now = new Date();
    const todayStart = new Date(now.setHours(0, 0, 0, 0));

    const stats = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: todayStart }
        }
      },
      {
        $group: {
          _id: { $hour: '$timestamp' },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id': 1 } },
    ]);

    // Fill in missing hours with 0
    const hourlyData = Array.from({ length: 24 }, (_, i) => ({
      hour: i,
      count: stats.find(s => s._id === i)?.count || 0
    }));

    return { success: true, data: hourlyData };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getRecentViews(limit: number = 10): Promise<APIResponse<any>> {
  try {
    await connectDB();

    const recent = await Analytics.find({})
      .sort({ timestamp: -1 })
      .limit(limit)
      .populate('songId', 'title slug');

    return { success: true, data: JSON.parse(JSON.stringify(recent)) };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getMostClickedSongs(limit: number = 10): Promise<APIResponse<any>> {
  try {
    await connectDB();

    const mostViewed = await Analytics.aggregate([
      {
        $group: {
          _id: '$songId',
          clickCount: { $sum: 1 },
        },
      },
      { $sort: { clickCount: -1 } },
      { $limit: limit },
      {
        $lookup: {
          from: 'songs',
          localField: '_id',
          foreignField: '_id',
          as: 'songDetails',
        },
      },
      { $unwind: '$songDetails' },
      {
        $project: {
          _id: 1,
          clickCount: 1,
          title: '$songDetails.title',
          slug: '$songDetails.slug',
        },
      },
    ]);

    return { success: true, data: mostViewed };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
