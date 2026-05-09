import { getAdminStats } from '@/lib/actions/admin';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Music, Eye, Grid, TrendingUp, Clock, PlusCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

import { RetryButton } from '@/components/admin/RetryButton';

export default async function AdminDashboard() {
  const response = await getAdminStats();
  
  if (!response.success) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center space-y-4 text-center">
        <h1 className="text-2xl font-bold text-red-600">Failed to load statistics</h1>
        <p className="text-muted-foreground">{response.error || 'Check your database connection.'}</p>
        <RetryButton />
      </div>
    );
  }

  const stats = response.data!;

  const statCards = [
    { label: 'Total Songs', value: stats.totalSongs, icon: Music, color: 'text-blue-600' },
    { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'text-green-600' },
    { label: 'Categories', value: stats.totalCategories, icon: Grid, color: 'text-purple-600' },
    { label: 'Engagement', value: 'High', icon: TrendingUp, color: 'text-orange-600' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening on SargamKeys.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium uppercase tracking-wider">{stat.label}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Songs */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.latestSongs && stats.latestSongs.length > 0 ? (
                stats.latestSongs.map((song: any) => (
                  <div key={song._id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-semibold">{song.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {song.category?.name || 'Uncategorized'} • {formatDate(song.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={song.status === 'Published' ? 'default' : 'secondary'}>
                        {song.status}
                      </Badge>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/songs/${song._id}`}>
                          <Settings className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="py-8 text-center text-muted-foreground">No songs found yet.</p>
              )}
            </div>
            <Button variant="outline" className="mt-6 w-full" asChild>
              <Link href="/admin/songs">Manage All Songs</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Button className="w-full justify-start gap-3" asChild>
                <Link href="/admin/songs/new">
                  <PlusCircle className="h-4 w-4" />
                  Add New Song
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3" asChild>
                <Link href="/admin/categories">
                  <Grid className="h-4 w-4" />
                  Manage Categories
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3" asChild>
                <Link href="/admin/settings">
                  <Settings className="h-4 w-4" />
                  Global Settings
                </Link>
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-600 text-white">
            <CardContent className="pt-6">
              <h3 className="mb-2 font-bold">SEO Optimization</h3>
              <p className="mb-4 text-xs text-blue-100">
                Ensure all songs have descriptions and tags for better search ranking.
              </p>
              <Button variant="secondary" size="sm" className="w-full" asChild>
                <Link href="/admin/songs?filter=missing_seo">Fix Missing SEO</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
