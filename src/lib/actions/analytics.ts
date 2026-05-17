'use server';

import { connectDB } from '@/lib/db';
import Analytics from '@/models/Analytics';
import Song from '@/models/Song';
import { APIResponse } from '@/types';
import mongoose from 'mongoose';

const APP_TIMEZONE = process.env.NEXT_PUBLIC_TIMEZONE || 'Asia/Kolkata';

/**
 * Gets the start of the current day, month, or year in the application timezone
 * and returns it as a Date object for MongoDB queries.
 */
function getStartOf(timeframe: 'day' | 'month' | 'year'): Date {
  const now = new Date();
  
  // Get date components in target timezone
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: APP_TIMEZONE,
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  });
  
  const parts = formatter.formatToParts(now);
  const getPart = (type: string) => parseInt(parts.find(p => p.type === type)!.value);
  
  const year = getPart('year');
  const month = getPart('month');
  const day = getPart('day');
  
  if (timeframe === 'day') {
    // Construct start of day in target timezone
    // We use the toLocaleString trick to find the UTC equivalent
    const localDate = new Date(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00`);
    const tzOffset = localDate.getTime() - new Date(localDate.toLocaleString('en-US', { timeZone: APP_TIMEZONE })).getTime();
    return new Date(localDate.getTime() + tzOffset);
  }
  
  if (timeframe === 'month') {
    const localDate = new Date(`${year}-${String(month).padStart(2, '0')}-01T00:00:00`);
    const tzOffset = localDate.getTime() - new Date(localDate.toLocaleString('en-US', { timeZone: APP_TIMEZONE })).getTime();
    return new Date(localDate.getTime() + tzOffset);
  }
  
  // Year
  const localDate = new Date(`${year}-01-01T00:00:00`);
  const tzOffset = localDate.getTime() - new Date(localDate.toLocaleString('en-US', { timeZone: APP_TIMEZONE })).getTime();
  return new Date(localDate.getTime() + tzOffset);
}

export async function getOverallStats(): Promise<APIResponse<any>> {
  try {
    await connectDB();

    const todayStart = getStartOf('day');
    const monthStart = getStartOf('month');
    const yearStart = getStartOf('year');

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

    const timezone = APP_TIMEZONE;

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
      // Use current date in target timezone to generate the last 30 days
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
      const parts = formatter.formatToParts(now);
      const getPart = (type: string) => parseInt(parts.find(p => p.type === type)!.value);
      
      const year = getPart('year');
      const month = getPart('month');
      const day = getPart('day');

      const last30Days = [];
      const referenceDate = new Date(year, month - 1, day);
      
      for (let i = 29; i >= 0; i--) {
        const d = new Date(referenceDate);
        d.setDate(d.getDate() - i);
        const currYear = d.getFullYear();
        const currMonth = d.getMonth() + 1;
        const currDay = d.getDate();

        const existing = formattedData.find(
          (s: any) => s._id.year === currYear && s._id.month === currMonth && s._id.day === currDay
        );

        last30Days.push({
          _id: { year: currYear, month: currMonth, day: currDay },
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

    const todayStart = getStartOf('day');
    const timezone = APP_TIMEZONE;

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
    const timezone = APP_TIMEZONE;

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
      // Use current date in target timezone to generate the last 30 days
      const now = new Date();
      const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });
      const parts = formatter.formatToParts(now);
      const getPart = (type: string) => parseInt(parts.find(p => p.type === type)!.value);
      
      const year = getPart('year');
      const month = getPart('month');
      const day = getPart('day');

      const last30Days = [];
      const referenceDate = new Date(year, month - 1, day);
      
      for (let i = 29; i >= 0; i--) {
        const d = new Date(referenceDate);
        d.setDate(d.getDate() - i);
        const currYear = d.getFullYear();
        const currMonth = d.getMonth() + 1;
        const currDay = d.getDate();

        const existing = timeline.find(
          (s: any) => s._id.year === currYear && s._id.month === currMonth && s._id.day === currDay
        );

        last30Days.push({
          _id: { year: currYear, month: currMonth, day: currDay },
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

export async function logPageView(songId: string, source?: string, sessionId?: string): Promise<APIResponse<string>> {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(songId)) {
      throw new Error('Invalid song ID');
    }

    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || 'unknown';
    const userAgent = headersList.get('user-agent') || 'unknown';
    const referrer = headersList.get('referer') || 'direct';
    
    // Auto-generate session ID if not provided
    const finalSessionId = sessionId || `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;

    // Increment global song views
    await Song.findByIdAndUpdate(songId, { $inc: { views: 1 } });

    const analytics = await Analytics.create({
      songId: new mongoose.Types.ObjectId(songId),
      sessionId: finalSessionId,
      ip,
      userAgent,
      referrer,
      source: source || 'direct',
      timestamp: new Date(),
    });

    return { success: true, data: analytics._id.toString() };
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

export async function updateDuration(analyticsId: string, duration: number, isExit: boolean = false): Promise<APIResponse<void>> {
  try {
    await connectDB();

    if (!mongoose.Types.ObjectId.isValid(analyticsId)) {
      throw new Error('Invalid analytics ID');
    }

    await Analytics.findByIdAndUpdate(analyticsId, {
      duration,
      isExit
    });

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function getAdvancedStats(): Promise<APIResponse<any>> {
  try {
    await connectDB();

    const [avgDuration, totalSessions, bouncelessSessions] = await Promise.all([
      Analytics.aggregate([
        { $match: { duration: { $gt: 0 } } },
        { $group: { _id: null, avg: { $avg: '$duration' } } }
      ]),
      Analytics.aggregate([
        { $group: { _id: '$sessionId' } },
        { $count: 'total' }
      ]),
      Analytics.aggregate([
        { $group: { _id: '$sessionId', pages: { $sum: 1 } } },
        { $match: { pages: { $gt: 1 } } },
        { $count: 'total' }
      ])
    ]);

    const sessions = totalSessions[0]?.total || 0;
    const bounceless = bouncelessSessions[0]?.total || 0;
    const bounceRate = sessions > 0 ? ((sessions - bounceless) / sessions) * 100 : 0;

    return {
      success: true,
      data: {
        avgDuration: avgDuration[0]?.avg || 0,
        bounceRate,
        totalSessions: sessions
      }
    };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}




