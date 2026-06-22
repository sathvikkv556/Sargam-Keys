'use client';

import React from 'react';
import { AdBanner } from './AdBanner';

export function LeaderboardAd() {
  return (
    <div className="w-full flex justify-center my-4 print:hidden">
      <div className="hidden md:block">
        <AdBanner adKey="a68e4f2aac739253ca980317b9643826" height={90} width={728} />
      </div>
      <div className="md:hidden">
        <AdBanner adKey="dbfc58175e3dacb79ad0de521f47f571" height={50} width={320} />
      </div>
    </div>
  );
}

export function RectangleAd() {
  return (
    <div className="flex justify-center my-4 print:hidden">
      <AdBanner adKey="5902f1f8db9c3e8e891852c621b7f9fa" height={250} width={300} />
    </div>
  );
}

export function SkyscraperAd() {
  return (
    <div className="flex justify-center my-4 print:hidden">
      <AdBanner adKey="56ffceeeb3ad208288f80807a2cceee5" height={300} width={160} />
    </div>
  );
}

export function NativeAd() {
  return (
    <div className="w-full my-4 print:hidden">
      <AdBanner adKey="6aa54cbfe81da50764bd200356ec8a93" type="native" />
    </div>
  );
}

interface PageAdLayoutProps {
  children: React.ReactNode;
  showNative?: boolean;
}

export function PageAdLayout({ children, showNative = true }: PageAdLayoutProps) {
  return (
    <div className="w-full">
      {/* 1. Top Leaderboard */}
      <LeaderboardAd />

      <div className="grid lg:grid-cols-[1fr_300px] gap-8 my-8 items-start">
        {/* Main Content Area */}
        <div className="w-full min-w-0">
          {children}
          
          {/* 2. Bottom Native Ad inside content */}
          {showNative && <NativeAd />}
        </div>

        {/* Desktop Sidebar Ads */}
        <aside className="hidden lg:flex flex-col gap-6 sticky top-24 h-fit w-[300px] shrink-0">
          {/* 3. Rectangle Ad 1 */}
          <RectangleAd />
          {/* 4. Skyscraper Ad 1 */}
          <SkyscraperAd />
          {/* 5. Rectangle Ad 2 */}
          <RectangleAd />
          {/* 6. Skyscraper Ad 2 */}
          <SkyscraperAd />
        </aside>
      </div>

      {/* Mobile Stacked Ads (Shown only on mobile below content) */}
      <div className="lg:hidden flex flex-col gap-6 my-8">
        <RectangleAd />
        <SkyscraperAd />
        <RectangleAd />
        <SkyscraperAd />
      </div>

      {/* 7. Bottom Leaderboard */}
      <LeaderboardAd />
    </div>
  );
}
