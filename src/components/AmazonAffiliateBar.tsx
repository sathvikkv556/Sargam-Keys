'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

export function AmazonAffiliateBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if it's already been shown in this session
    const hasBeenShown = sessionStorage.getItem('amazon_affiliate_bar_shown');
    
    if (!hasBeenShown) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        sessionStorage.setItem('amazon_affiliate_bar_shown', 'true');
      }, 15000); // 15 seconds

      return () => clearTimeout(timer);
    }
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none animate-in fade-in slide-in-from-bottom-8 duration-500">
      <div className="mx-auto max-w-4xl relative pointer-events-auto">
        <div className="bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-900 shadow-2xl rounded-2xl p-4 sm:p-5 pr-12 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          
          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="space-y-1">
            <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span>🎹</span> Looking for a keyboard to practice?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Find keyboards, headphones and piano accessories on Amazon.
            </p>
            <p className="text-[10px] sm:text-xs text-slate-500 mt-1">
              As an Amazon Associate I earn from qualifying purchases.
            </p>
          </div>

          <a 
            href="https://www.amazon.in?&linkCode=ll2&tag=sargamkeys21-21&linkId=40f711559f485e825695e9602d33a4fa&ref_=as_li_ss_tl"
            target="_blank"
            rel="nofollow sponsored noopener"
            className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2.5 px-6 rounded-lg transition-colors text-center w-full sm:w-auto shadow-sm"
          >
            Shop on Amazon →
          </a>

        </div>
      </div>
    </div>
  );
}
