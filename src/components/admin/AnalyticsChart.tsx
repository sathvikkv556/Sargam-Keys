'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  MousePointer2, 
  Calendar, 
  BarChart3,
  ChevronRight
} from 'lucide-react';

interface AnalyticsChartProps {
  timeline: any[];
  stats: {
    totalViews: number;
    todayViews: number;
    monthViews: number;
    yearViews: number;
  };
}

export default function AnalyticsChart({ timeline, stats }: AnalyticsChartProps) {
  const [activeTab, setActiveTab] = useState<'clicks'>('clicks');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const maxViews = Math.max(...timeline.map((d: any) => d.count), 1);
  const chartHeight = 200;
  const chartWidth = 800; // Will be responsive via viewBox
  const padding = 20;

  // Generate points for the line chart
  const points = timeline.map((day, i) => {
    const x = (i / (timeline.length - 1)) * (chartWidth - padding * 2) + padding;
    const y = chartHeight - (day.count / maxViews) * (chartHeight - padding * 2) - padding;
    return `${x},${y}`;
  }).join(' ');

  // Area points (for the gradient fill)
  const areaPoints = `
    ${padding},${chartHeight - padding} 
    ${points} 
    ${chartWidth - padding},${chartHeight - padding}
  `;

  return (
    <div className="rounded-xl border bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 overflow-hidden">
      {/* GSC Style Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b dark:border-slate-800">
        <button 
          onClick={() => setActiveTab('clicks')}
          className={`p-4 text-left transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50 border-b-4 ${
            activeTab === 'clicks' ? 'border-blue-500 bg-blue-50/30 dark:bg-blue-500/5' : 'border-transparent'
          }`}
        >
          <div className="flex items-center gap-2 text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">
            <MousePointer2 className="h-3 w-3" />
            Total Clicks
          </div>
          <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <TrendingUp className="h-2 w-2" />
            Across all time
          </div>
        </button>

        <div className="p-4 text-left border-l dark:border-slate-800 opacity-50 cursor-not-allowed">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 uppercase tracking-wider mb-1">
            <TrendingUp className="h-3 w-3" />
            Impressions
          </div>
          <div className="text-2xl font-bold">{(stats.totalViews * 12.5).toFixed(0).toLocaleString()}</div>
          <div className="text-[10px] text-slate-400 mt-1 italic">Estimated data</div>
        </div>

        <div className="p-4 text-left border-l dark:border-slate-800 opacity-50 cursor-not-allowed hidden md:block">
          <div className="flex items-center gap-2 text-xs font-bold text-orange-600 uppercase tracking-wider mb-1">
            <BarChart3 className="h-3 w-3" />
            Avg. CTR
          </div>
          <div className="text-2xl font-bold">8.2%</div>
          <div className="text-[10px] text-slate-400 mt-1 italic">Based on estimates</div>
        </div>

        <div className="p-4 text-left border-l dark:border-slate-800 opacity-50 cursor-not-allowed hidden md:block">
          <div className="flex items-center gap-2 text-xs font-bold text-purple-600 uppercase tracking-wider mb-1">
            <Calendar className="h-3 w-3" />
            Avg. Position
          </div>
          <div className="text-2xl font-bold">14.2</div>
          <div className="text-[10px] text-slate-400 mt-1 italic">Last 30 days</div>
        </div>
      </div>

      {/* Chart Area */}
      <div className="p-6">
        <div className="relative h-[250px] w-full">
          <svg 
            viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
            className="h-full w-full overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
              <line 
                key={i}
                x1={padding}
                y1={chartHeight - padding - p * (chartHeight - padding * 2)}
                x2={chartWidth - padding}
                y2={chartHeight - padding - p * (chartHeight - padding * 2)}
                stroke="currentColor"
                className="text-slate-100 dark:text-slate-800"
                strokeWidth="1"
              />
            ))}

            {/* Gradient definition */}
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Area fill */}
            <polyline
              points={areaPoints}
              fill="url(#chartGradient)"
              stroke="none"
            />

            {/* Line */}
            <polyline
              points={points}
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data points and hover zones */}
            {timeline.map((day, i) => {
              const x = (i / (timeline.length - 1)) * (chartWidth - padding * 2) + padding;
              const y = chartHeight - (day.count / maxViews) * (chartHeight - padding * 2) - padding;
              
              return (
                <g key={i}>
                  {/* Invisible hover trigger */}
                  <rect
                    x={x - (chartWidth / timeline.length / 2)}
                    y={0}
                    width={chartWidth / timeline.length}
                    height={chartHeight}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                  
                  {/* Point on line (visible only on hover) */}
                  {hoveredIndex === i && (
                    <>
                      <line 
                        x1={x} y1={padding} x2={x} y2={chartHeight - padding}
                        stroke="#3b82f6" strokeWidth="1" strokeDasharray="4,4"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="5"
                        fill="#3b82f6"
                        stroke="white"
                        strokeWidth="2"
                        className="pointer-events-none"
                      />
                    </>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Tooltip */}
          {hoveredIndex !== null && (
            <div 
              className="absolute z-20 pointer-events-none bg-slate-900 text-white p-2 rounded shadow-lg text-[10px] min-w-[120px]"
              style={{
                left: `${(hoveredIndex / (timeline.length - 1)) * 100}%`,
                top: '10%',
                transform: hoveredIndex > timeline.length / 2 ? 'translateX(-100%)' : 'none',
                marginLeft: hoveredIndex > timeline.length / 2 ? '-10px' : '10px'
              }}
            >
              <div className="font-bold border-b border-slate-700 pb-1 mb-1">
                {new Date(timeline[hoveredIndex]._id.year, timeline[hoveredIndex]._id.month - 1, timeline[hoveredIndex]._id.day).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  Clicks:
                </span>
                <span className="font-mono font-bold">{timeline[hoveredIndex].count}</span>
              </div>
            </div>
          )}
        </div>

        {/* X-Axis Labels */}
        <div className="flex justify-between mt-2 px-[20px]">
          {timeline.filter((_, i) => i % 7 === 0 || i === timeline.length - 1).map((day, i) => (
            <span key={i} className="text-[10px] text-slate-400 font-medium">
              {day._id.month}/{day._id.day}
            </span>
          ))}
        </div>
      </div>
      
      <div className="bg-slate-50 dark:bg-slate-800/30 p-3 flex justify-between items-center text-[10px] text-slate-500 font-medium">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <div className="w-3 h-0.5 bg-blue-500"></div>
            Total Clicks
          </span>
          <span className="flex items-center gap-1 opacity-50">
            <div className="w-3 h-0.5 bg-emerald-500"></div>
            Total Impressions
          </span>
        </div>
        <div className="flex items-center gap-1">
          Last updated: {isMounted ? new Date().toLocaleTimeString() : '...'}
          <ChevronRight className="h-3 w-3" />
        </div>
      </div>
    </div>
  );
}
