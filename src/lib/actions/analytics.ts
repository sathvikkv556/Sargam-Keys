'use server';

import { connectDB } from '@/lib/db';
import Analytics from '@/models/Analytics';
import Song from '@/models/Song';
import { APIResponse } from '@/types';
import mongoose from 'mongoose';

export async function getOverallStats(): Promise<APIResponse<any>> {
  try {
    await connectDB();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const monthStart = new Date();
    monthStart.setDate(1);
    monthStart.setHours(0, 0, 0, 0);

    const yearStart = new Date();
    yearStart.setMonth(0, 1);
    yearStart.setHours(0, 0, 0, 0);

    const [totalViews, todayViews, monthViews, yearViews, sourceStats] = await Promise.all([
      Analytics.countDocuments({}),
      Analytics.countDocuments({ timestamp: { $gte: todayStart } }),
      Analytics.countDocuments({ timestamp: { $gte: monthStart } }),
      Analytics.countDocuments({ timestamp: { $gte: yearStart } }),
      Analytics.aggregate([
        {
          $group: {
            _id: '$source',
            count: { $sum: 1 },
          },
        },
        { $sort: { count: -1 } },
      ]),
    ]);

    return {
      success: true,
      data: {
        totalViews,
        todayViews,
        monthViews,
        yearViews,
        sourceStats,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getTrafficSourceStats(): Promise<APIResponse<any>> {
  try {
    await connectDB();

    const stats = await Analytics.aggregate([
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    return { success: true, data: stats };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getViewsByTimeframe(timeframe: 'day' | 'month' | 'year' = 'day'): Promise<APIResponse<any>> {
  try {
    await connectDB();

    let groupBy: any;
    let limit = 30;

    // Use server's timezone for grouping to match "Today" definition
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

    if (timeframe === 'day') {
      groupBy = {
        year: { $year: { date: '$timestamp', timezone } },
        month: { $month: { date: '$timestamp', timezone } },
        day: { $dayOfMonth: { date: '$timestamp', timezone } },
      };
      limit = 30;
    } else if (timeframe === 'month') {
      groupBy = {
        year: { $year: { date: '$timestamp', timezone } },
        month: { $month: { date: '$timestamp', timezone } },
      };
      limit = 12;
    } else {
      groupBy = {
        year: { $year: { date: '$timestamp', timezone } },
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

    let formattedData = stats.reverse();

    // Fill in gaps for 'day' timeframe to ensure continuous 30 days
    if (timeframe === 'day') {
      const now = new Date();
      const last30Days = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();

        const existing = formattedData.find(
          (s: any) => s._id.year === year && s._id.month === month && s._id.day === day
        );

        last30Days.push({
          _id: { year, month, day },
          count: existing ? existing.count : 0,
        });
      }
      formattedData = last30Days;
    }

    return { success: true, data: formattedData };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getHourlyStatsToday(): Promise<APIResponse<any>> {
  try {
    await connectDB();

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

    const stats = await Analytics.aggregate([
      {
        $match: {
          timestamp: { $gte: todayStart }
        }
      },
      {
        $group: {
          _id: { $hour: { date: '$timestamp', timezone } },
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

export async function getSongAnalytics(songId: string, timeframe: 'day' | 'month' | 'year' = 'day'): Promise<APIResponse<any>> {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(songId)) {
      throw new Error('Invalid song ID');
    }

    const song = await Song.findById(songId).select('title slug');
    if (!song) {
      throw new Error('Song not found');
    }

    const objectId = new mongoose.Types.ObjectId(songId);

    // Get total views for this song
    const totalViews = await Analytics.countDocuments({ songId: objectId });

    // Get views by timeframe
    let groupBy: any;
    let limit = 30;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

    if (timeframe === 'day') {
      groupBy = {
        year: { $year: { date: '$timestamp', timezone } },
        month: { $month: { date: '$timestamp', timezone } },
        day: { $dayOfMonth: { date: '$timestamp', timezone } },
      };
      limit = 30;
    } else if (timeframe === 'month') {
      groupBy = {
        year: { $year: { date: '$timestamp', timezone } },
        month: { $month: { date: '$timestamp', timezone } },
      };
      limit = 12;
    } else {
      groupBy = {
        year: { $year: { date: '$timestamp', timezone } },
      };
      limit = 5;
    }

    const stats = await Analytics.aggregate([
      { $match: { songId: objectId } },
      {
        $group: {
          _id: groupBy,
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': -1, '_id.month': -1, '_id.day': -1 } },
      { $limit: limit },
    ]);

    let timeline = stats.reverse();

    if (timeframe === 'day') {
      const now = new Date();
      const last30Days = [];
      for (let i = 29; i >= 0; i--) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);
        const year = d.getFullYear();
        const month = d.getMonth() + 1;
        const day = d.getDate();

        const existing = timeline.find(
          (s: any) => s._id.year === year && s._id.month === month && s._id.day === day
        );

        last30Days.push({
          _id: { year, month, day },
          count: existing ? existing.count : 0,
        });
      }
      timeline = last30Days;
    }

    // Get traffic sources for this song
    const sourceStats = await Analytics.aggregate([
      { $match: { songId: objectId } },
      {
        $group: {
          _id: '$source',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    return {
      success: true,
      data: {
        song,
        totalViews,
        timeline,
        sourceStats,
      },
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getAllSongsAnalytics(): Promise<APIResponse<any>> {
  try {
    await connectDB();

    const allSongs = await Song.find({}).select('title slug').lean();
    
    const viewsData = await Analytics.aggregate([
      {
        $group: {
          _id: '$songId',
          count: { $sum: 1 }
        }
      }
    ]);

    const songsWithViews = allSongs.map(song => {
      const viewData = viewsData.find(v => v._id.toString() === (song as any)._id.toString());
      return {
        _id: (song as any)._id.toString(),
        title: song.title,
        slug: song.slug,
        clickCount: viewData ? viewData.count : 0
      };
    });

    // Sort by clickCount descending
    songsWithViews.sort((a, b) => b.clickCount - a.clickCount);

    return { success: true, data: songsWithViews };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
