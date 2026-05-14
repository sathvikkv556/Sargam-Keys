import { Metadata } from 'next';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Eye, 
  ArrowUpRight,
  Music,
  Clock,
  Activity,
  Search,
  Globe,
  Share2
} from 'lucide-react';
import { 
  getOverallStats, 
  getViewsByTimeframe, 
  getMostClickedSongs,
  getHourlyStatsToday,
  getRecentViews
} from '@/lib/actions/analytics';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Analytics | Admin Dashboard',
};

export default async function AnalyticsPage() {
  const [
    statsResponse, 
    timelineResponse, 
    mostClickedResponse,
    hourlyResponse,
    recentResponse
  ] = await Promise.all([
    getOverallStats(),
    getViewsByTimeframe('day'),
    getMostClickedSongs(10),
    getHourlyStatsToday(),
    getRecentViews(15)
  ]);

  const stats = statsResponse.success ? statsResponse.data : { totalViews: 0, todayViews: 0, monthViews: 0, yearViews: 0, sourceStats: [] };
  const timeline = timelineResponse.success ? timelineResponse.data : [];
  const mostClicked = mostClickedResponse.success ? mostClickedResponse.data : [];
  const hourly = hourlyResponse.success ? hourlyResponse.data : [];
  const recent = recentResponse.success ? recentResponse.data : [];

  // Find max for scaling charts
  const maxViews = Math.max(...timeline.map((d: any) => d.count), 1);
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

      {/* Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Today's Clicks" 
          value={stats.todayViews} 
          icon={TrendingUp} 
          color="text-blue-600"
          bgColor="bg-blue-50 dark:bg-blue-900/20"
        />
        <StatCard 
          title="This Month" 
          value={stats.monthViews} 
          icon={Calendar} 
          color="text-orange-600"
          bgColor="bg-orange-50 dark:bg-orange-900/20"
        />
        <StatCard 
          title="This Year" 
          value={stats.yearViews} 
          icon={BarChart3} 
          color="text-green-600"
          bgColor="bg-green-50 dark:bg-green-900/20"
        />
        <StatCard 
          title="Total Clicks" 
          value={stats.totalViews} 
          icon={Eye} 
          color="text-purple-600"
          bgColor="bg-purple-50 dark:bg-purple-900/20"
        />
      </div>

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
                    <p className="text-sm font-medium truncate leading-tight">{item.songId?.title || 'Unknown Song'}</p>
                    <div className="mt-1 flex items-center gap-2 text-[10px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="h-2.5 w-2.5" />
                        {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>•</span>
                      <span className="font-mono opacity-60">IP: {item.ip.split(',')[0]}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Daily Comparison (30 Days) */}
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Traffic Growth (Last 30 Days)</h2>
          </div>
          
          <div className="flex h-48 items-end gap-2 overflow-x-auto pb-2">
            {timeline.map((day: any, i: number) => (
              <div key={i} className="group relative flex flex-1 flex-col items-center min-w-[12px]">
                <div 
                  className="w-full rounded-t-sm bg-slate-300 dark:bg-slate-700 transition-all group-hover:bg-blue-500"
                  style={{ height: `${(day.count / maxViews) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 rounded bg-slate-900 px-2 py-1 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100 whitespace-nowrap z-10">
                    {day.count} views ({day._id.day}/{day._id.month})
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6">
            <h2 className="text-xl font-bold">Top Performing Notes</h2>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {mostClicked.slice(0, 6).map((item: any, i: number) => (
              <div key={item._id} className="flex items-center gap-3 rounded-lg border border-slate-100 p-3 dark:border-slate-800">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-50 text-blue-600 dark:bg-blue-900/20 text-xs font-bold">
                  #{i + 1}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold">{item.title}</p>
                  <p className="text-[10px] text-slate-500">{item.clickCount} views</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Globe className="h-5 w-5 text-indigo-500" />
            Traffic Sources Breakdown
          </h2>
          <p className="text-sm text-slate-400">Where your visitors are coming from</p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.sourceStats?.map((source: any) => (
            <div key={source._id || 'unknown'} className="flex items-center justify-between rounded-lg border border-slate-100 p-4 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <SourceIcon source={source._id} />
                <span className="text-sm font-medium capitalize">{source._id || 'Direct'}</span>
              </div>
              <div className="text-right">
                <span className="text-lg font-bold">{source.count}</span>
                <p className="text-[10px] text-slate-500">
                  {stats.totalViews > 0 ? ((source.count / stats.totalViews) * 100).toFixed(1) : 0}%
                </p>
              </div>
            </div>
          ))}
          {(!stats.sourceStats || stats.sourceStats.length === 0) && (
            <div className="col-span-full py-8 text-center text-slate-400 italic border rounded-lg border-dashed">
              No traffic source data available yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bgColor }: any) {
  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-4">
        <div className={`rounded-lg ${bgColor} p-3`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold">{value.toLocaleString()}</h3>
        </div>
      </div>
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


