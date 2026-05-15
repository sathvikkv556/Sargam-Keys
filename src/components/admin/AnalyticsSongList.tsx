'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Music, ChevronRight, BarChart2 } from 'lucide-react';

interface SongStat {
  _id: string;
  title: string;
  slug: string;
  clickCount: number;
}

interface AnalyticsSongListProps {
  songs: SongStat[];
}

export default function AnalyticsSongList({ songs }: AnalyticsSongListProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = songs.filter(song => 
    song.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-xl border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
      <div className="p-6 border-b dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <BarChart2 className="h-5 w-5 text-blue-500" />
            All Song Performance
          </h2>
          <p className="text-sm text-slate-400">Search and analyze any song from your library</p>
        </div>
        
        <div className="relative max-w-sm w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search songs..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-800 dark:bg-slate-800/50 dark:focus:bg-slate-800 transition-all text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-b dark:border-slate-800">
              <th className="px-6 py-3">Song Title</th>
              <th className="px-6 py-3 text-right">Total Clicks</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-slate-800">
            {filteredSongs.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-12 text-center text-slate-400 italic">
                  No songs found matching "{searchQuery}"
                </td>
              </tr>
            ) : (
              filteredSongs.map((song) => (
                <tr key={song._id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded bg-slate-100 p-1.5 dark:bg-slate-800">
                        <Music className="h-3.5 w-3.5 text-slate-500" />
                      </div>
                      <span className="text-sm font-medium">{song.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-mono font-bold text-blue-600 dark:text-blue-400">
                      {song.clickCount.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/admin/analytics/song/${song._id}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      View Report
                      <ChevronRight className="h-3 w-3" />
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="p-4 bg-slate-50 dark:bg-slate-800/30 border-t dark:border-slate-800 text-[10px] text-slate-400 text-center">
        Showing {filteredSongs.length} of {songs.length} songs
      </div>
    </div>
  );
}
