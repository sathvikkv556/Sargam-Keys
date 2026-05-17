import { Metadata } from 'next';
import Link from 'next/link';
import { 
  TrendingUp, 
  ArrowUpRight,
  Music,
  Clock,
  Activity,
  Search,
  Globe,
  Share2,
  ChevronRight
} from 'lucide-react';
import { 
  getOverallStats, 
  getViewsByTimeframe, 
  getMostClickedSongs,
  getHourlyStatsToday,
  getRecentViews,
  getAllSongsAnalytics,
  getAdvancedStats
} from '@/lib/actions/analytics';
import AnalyticsChart from '@/components/admin/AnalyticsChart';
import AnalyticsSongList from '@/components/admin/AnalyticsSongList';

import { formatDate, formatTime } from '@/lib/utils';
import { Users, Timer, BarChart } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Analytics | Admin Dashboard',
};

export default async function AnalyticsPage() {
  const [
    statsResponse, 
    timelineResponse, 
    mostClickedResponse,
    hourlyResponse,
    recentResponse,
    allSongsResponse,
    advancedResponse
  ] = await Promise.all([
    getOverallStats(),
    getViewsByTimeframe('day'),
    getMostClickedSongs(12), 
    getHourlyStatsToday(),
    getRecentViews(15),
    getAllSongsAnalytics(),
    getAdvancedStats()
  ]);

  const stats = statsResponse.success ? statsResponse.data : { totalViews: 0, todayViews: 0, monthViews: 0, yearViews: 0, sourceStats: [] };
  const timeline = timelineResponse.success ? timelineResponse.data : [];
  const mostClicked = mostClickedResponse.success ? mostClickedResponse.data : [];
  const hourly = hourlyResponse.success ? hourlyResponse.data : [];
  const recent = recentResponse.success ? recentResponse.data : [];
  const allSongs = allSongsResponse.success ? allSongsResponse.data : [];
  const advanced = advancedResponse.success ? advancedResponse.data : { avgDuration: 0, bounceRate: 0, totalSessions: 0 };

  const maxHourly = Math.max(...hourly.map((d: any) => d.count), 1);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-slate-500">Real-time engagement and traffic patterns.</p>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600 dark:bg-emerald-950/20">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Live Monitoring Active
        </div>
      </div>

      {/* High-Class Session Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <Users className="h-4 w-4 text-blue-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Total Sessions</span>
          </div>
          <div className="text-3xl font-bold">{advanced.totalSessions.toLocaleString()}</div>
          <p className="text-[10px] text-slate-400 mt-1">Unique visitor sessions logged</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <Timer className="h-4 w-4 text-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Avg. Stay Time</span>
          </div>
          <div className="text-3xl font-bold">
            {Math.floor(advanced.avgDuration / 60)}m {Math.floor(advanced.avgDuration % 60)}s
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Average time spent per page</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <BarChart className="h-4 w-4 text-orange-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Bounce Rate</span>
          </div>
          <div className="text-3xl font-bold">{advanced.bounceRate.toFixed(1)}%</div>
          <p className="text-[10px] text-slate-400 mt-1">Single-page session percentage</p>
        </div>

        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-3 text-slate-500 mb-2">
            <TrendingUp className="h-4 w-4 text-purple-500" />
            <span className="text-xs font-bold uppercase tracking-wider">Pages / Session</span>
          </div>
          <div className="text-3xl font-bold">
            {(stats.totalViews / Math.max(advanced.totalSessions, 1)).toFixed(2)}
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Average depth of exploration</p>
        </div>
      </div>

      {/* Main Analytics Chart (GSC Style) */}
      <AnalyticsChart timeline={timeline} stats={stats} />

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Hourly Trend (Today) */}
        <div className="lg:col-span-2 rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clock className="h-5 w-5 text-blue-500" />
              Today's Hourly Trend
            </h2>
            <span className="text-xs text-slate-400 font-medium italic">Showing 24-hour distribution</span>
          </div>
          
          <div className="flex h-64 items-end gap-1.5 overflow-x-auto pb-4 pt-4">
            {hourly.map((h: any, i: number) => (
              <div key={i} className="group relative flex flex-1 flex-col items-center min-w-[15px]">
                <div 
                  className="w-full rounded-t-sm bg-blue-500/40 transition-all group-hover:bg-blue-500"
                  style={{ height: `${(h.count / maxHourly) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap z-10">
                    {h.count} clicks at {h.hour}:00
                  </div>
                </div>
                <div className="mt-2 text-[8px] text-slate-400 font-mono">
                  {h.hour}h
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Activity className="h-5 w-5 text-emerald-500" />
              Recent Clicks
            </h2>
            <p className="text-sm text-slate-400">Live feed of visitor activity</p>
          </div>
          
          <div className="space-y-4 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
            {recent.length === 0 ? (
              <div className="py-8 text-center text-slate-400 italic">No activity logged yet today</div>
            ) : (
              recent.map((item: any, i: number) => (
                <div key={i} className="flex items-start gap-3 border-b pb-3 last:border-0 last:pb-0 dark:border-slate-800">
                  <div className="mt-1 rounded-full bg-slate-100 p-1.5 dark:bg-slate-800">
                    <Music className="h-3 w-3 text-slate-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    {item.songId ? (
                      <Link 
                        href={`/admin/analytics/song/${item.songId._id}`}
                        className="text-sm font-medium truncate leading-tight hover:text-blue-600 transition-colors block"
                      >
                        {item.songId.title}
                      </Link>
                    ) : (
                      <p className="text-sm font-medium truncate leading-tight">Unknown Song</p>
                    )}
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {formatTime(item.timestamp)}
                      </span>
                      <span>•</span>
                      <span className="font-mono opacity-60">IP: {item.ip?.split(',')[0] || 'Unknown'}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Top Performers */}
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Song Performance</h2>
            <span className="text-xs text-slate-400">Click a song for details</span>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {mostClicked.map((item: any, i: number) => (
              <Link 
                key={item._id} 
                href={`/admin/analytics/song/${item._id}`}
                className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 hover:border-blue-200 hover:bg-blue-50/30 transition-all dark:border-slate-800 dark:hover:border-blue-900/40 dark:hover:bg-blue-900/10 group"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-50 text-slate-400 group-hover:bg-blue-100 group-hover:text-blue-600 dark:bg-slate-800 dark:text-slate-500 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400 text-xs font-bold transition-colors">
                  #{i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">{item.title}</p>
                  <p className="text-[10px] text-slate-500">{item.clickCount.toLocaleString()} views</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-blue-400 transition-colors" />
              </Link>
            ))}
          </div>
        </div>

        {/* Traffic Sources Breakdown */}
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Globe className="h-5 w-5 text-indigo-500" />
              Traffic Sources
            </h2>
          </div>
          
          <div className="space-y-3">
            {stats.sourceStats?.map((source: any) => (
              <div key={source._id || 'unknown'} className="flex items-center justify-between p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <SourceIcon source={source._id} />
                  <span className="text-sm font-medium capitalize">{source._id || 'Direct'}</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                    <div 
                      className="h-full bg-indigo-500" 
                      style={{ width: `${stats.totalViews > 0 ? (source.count / stats.totalViews) * 100 : 0}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold w-12 text-right">{source.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* All Songs Searchable List */}
      <AnalyticsSongList songs={allSongs} />
    </div>
  );
}

function SourceIcon({ source }: { source: string }) {
  switch (source) {
    case 'google':
      return <Search className="h-4 w-4 text-blue-500" />;
    case 'facebook':
      return <Share2 className="h-4 w-4 text-blue-600" />;
    case 'twitter':
      return <Share2 className="h-4 w-4 text-sky-500" />;
    case 'youtube':
      return <Music className="h-4 w-4 text-red-600" />;
    case 'direct':
      return <ArrowUpRight className="h-4 w-4 text-slate-500" />;
    case 'internal':
      return <Music className="h-4 w-4 text-emerald-500" />;
    default:
      return <Globe className="h-4 w-4 text-slate-400" />;
  }
}


