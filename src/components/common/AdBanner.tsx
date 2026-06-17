'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  adKey: string;
  height?: number;
  width?: number;
  format?: string;
  type?: 'banner' | 'native';
}

export function AdBanner({ adKey, height, width, format = 'iframe', type = 'banner' }: AdBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client side and if ref exists
    if (typeof window === 'undefined' || !bannerRef.current) return;

    // Clear existing content to avoid double injection if props change
    bannerRef.current.innerHTML = '';

    try {
      if (type === 'banner') {
        // Create configuration script
        const confScript = document.createElement('script');
        confScript.type = 'text/javascript';
        confScript.innerHTML = `
          atOptions = {
            'key' : '${adKey}',
            'format' : '${format}',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
          };
        `;
        
        // Create invocation script
        const invokeScript = document.createElement('script');
        invokeScript.type = 'text/javascript';
        invokeScript.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
        invokeScript.async = true;

        bannerRef.current.appendChild(confScript);
        bannerRef.current.appendChild(invokeScript);
      } else if (type === 'native') {
        // Create container first
        const container = document.createElement('div');
        container.id = `container-${adKey}`;
        bannerRef.current.appendChild(container);

        // Create script
        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = `https://pl29418313.effectivecpmnetwork.com/${adKey}/invoke.js`;
        
        bannerRef.current.appendChild(script);
      }
    } catch (error) {
      console.error('AdBanner Error:', error);
    }
  }, [adKey, height, width, format, type]);

  const minHeight = height ? `${height}px` : 'auto';
  const minWidth = width ? `${width}px` : '100%';

  return (
    <div 
      className="flex justify-center items-center w-full overflow-hidden my-6 bg-gray-50/50 dark:bg-slate-900/50 rounded-lg print:hidden" 
      style={{ 
        minHeight, 
        minWidth,
      }}
    >
      <div 
        ref={bannerRef}
        className="w-full h-full flex justify-center items-center"
      />
    </div>
  );
}
