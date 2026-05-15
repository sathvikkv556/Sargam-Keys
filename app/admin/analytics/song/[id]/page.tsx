import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  ArrowLeft, 
  Music, 
  Globe, 
  Search, 
  Share2, 
  ArrowUpRight,
  TrendingUp,
  MousePointer2,
  ExternalLink
} from 'lucide-react';
import { getSongAnalytics } from '@/lib/actions/analytics';
import AnalyticsChart from '@/components/admin/AnalyticsChart';

export const metadata: Metadata = {
  title: 'Song Analytics | Admin Dashboard',
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SongAnalyticsPage({ params }: Props) {
  const { id } = await params;
  const response = await getSongAnalytics(id);

  if (!response.success) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <h1 className="text-2xl font-bold text-red-600">Error loading analytics</h1>
        <p className="text-slate-500">{response.error}</p>
        <Link href="/admin/analytics" className="mt-4 text-blue-600 hover:underline">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  const { song, totalViews, timeline, sourceStats } = response.data;

  // Derive stats for the chart component
  const chartStats = {
    totalViews: totalViews,
    todayViews: timeline[timeline.length - 1]?.count || 0,
    monthViews: timeline.reduce((acc: number, curr: any) => acc + curr.count, 0),
    yearViews: totalViews // Fallback
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <Link 
            href="/admin/analytics" 
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
              <Music className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{song.title}</h1>
          </div>
          <p className="text-slate-500 pl-11">Performance analytics for this song</p>
        </div>
        
        <Link 
          href={`/notes/${song.slug}`}
          target="_blank"
          className="flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50 transition-all"
        >
          View on Site
          <ExternalLink className="h-4 w-4" />
        </Link>
      </div>

      {/* Main Chart for this Song */}
      <AnalyticsChart timeline={timeline} stats={chartStats} />

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Source Breakdown for this Song */}
        <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Globe className="h-5 w-5 text-indigo-500" />
              Traffic Sources
            </h2>
            <p className="text-sm text-slate-400">Where visitors are coming from</p>
          </div>
          
          <div className="space-y-4">
            {sourceStats.length === 0 ? (
              <p className="py-8 text-center text-slate-400 italic">No source data available</p>
            ) : (
              sourceStats.map((source: any) => (
                <div key={source._id || 'unknown'} className="flex items-center justify-between p-2 rounded hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <SourceIcon source={source._id} />
                    <span className="text-sm font-medium capitalize">{source._id || 'Direct'}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden hidden sm:block">
                      <div 
                        className="h-full bg-indigo-500" 
                        style={{ width: `${totalViews > 0 ? (source.count / totalViews) * 100 : 0}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-bold w-12 text-right">{source.count}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-2 text-slate-500 flex items-center gap-2">
              <MousePointer2 className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">All-time Clicks</span>
            </div>
            <div className="text-3xl font-bold">{totalViews.toLocaleString()}</div>
          </div>
          
          <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-2 text-slate-500 flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Today's Clicks</span>
            </div>
            <div className="text-3xl font-bold">{timeline[timeline.length - 1]?.count || 0}</div>
          </div>

          <div className="rounded-xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 col-span-2">
            <h3 className="font-bold mb-4">Engagement Insights</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b dark:border-slate-800">
                <span className="text-slate-500">Peak Visibility</span>
                <span className="font-medium">
                  {Math.max(...timeline.map((d: any) => d.count))} views / day
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b dark:border-slate-800">
                <span className="text-slate-500">Primary Source</span>
                <span className="font-medium capitalize">{sourceStats[0]?._id || 'Direct'}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span className="text-slate-500">Daily Average</span>
                <span className="font-medium">
                  {(totalViews / Math.max(timeline.length, 1)).toFixed(1)} views
                </span>
              </div>
            </div>
          </div>
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
