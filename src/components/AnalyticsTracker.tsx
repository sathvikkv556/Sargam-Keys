'use client';

import { useEffect, useRef } from 'react';
import { logPageView, updateDuration } from '@/lib/actions/analytics';

interface AnalyticsTrackerProps {
  songId: string;
}

export default function AnalyticsTracker({ songId }: AnalyticsTrackerProps) {
  const analyticsIdRef = useRef<string | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    // Initial page view log
    const trackPageView = async () => {
      // Check if session ID exists in sessionStorage
      let sessionId = sessionStorage.getItem('raagakeys_session');
      if (!sessionId) {
        sessionId = `sess_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
        sessionStorage.setItem('raagakeys_session', sessionId);
      }

      // Get source from URL if present
      const urlParams = new URLSearchParams(window.location.search);
      const source = urlParams.get('utm_source') || undefined;

      const response = await logPageView(songId, source, sessionId);
      if (response.success && response.data) {
        analyticsIdRef.current = response.data;
      }
    };

    trackPageView();

    // Heartbeat to update duration every 10 seconds
    const interval = setInterval(() => {
      if (analyticsIdRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        updateDuration(analyticsIdRef.current, duration);
      }
    }, 10000);

    // Final update on unmount/exit
    const handleExit = () => {
      if (analyticsIdRef.current) {
        const duration = Math.floor((Date.now() - startTimeRef.current) / 1000);
        // Use sendBeacon style if possible, but updateDuration is a server action
        // For simple SPA navigation, this works
        updateDuration(analyticsIdRef.current, duration, true);
      }
    };

    window.addEventListener('beforeunload', handleExit);

    return () => {
      clearInterval(interval);
      handleExit();
      window.removeEventListener('beforeunload', handleExit);
    };
  }, [songId]);

  return null;
}
