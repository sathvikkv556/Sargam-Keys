'use client';

import React from 'react';

export function LeaderboardAd() {
  return null;
}

export function RectangleAd() {
  return null;
}

export function SkyscraperAd() {
  return null;
}

export function NativeAd() {
  return null;
}

interface PageAdLayoutProps {
  children: React.ReactNode;
  showNative?: boolean;
}

export function PageAdLayout({ children }: PageAdLayoutProps) {
  return <div className="w-full">{children}</div>;
}

