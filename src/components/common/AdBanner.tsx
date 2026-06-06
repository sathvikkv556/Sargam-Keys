'use client';

import { useEffect, useRef } from 'react';

interface AdBannerProps {
  adKey: string;
  height: number;
  width: number;
  format?: string;
}

export function AdBanner({ adKey, height, width, format = 'iframe' }: AdBannerProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bannerRef.current && !bannerRef.current.firstChild) {
      try {
        const conf = document.createElement('script');
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
        script.async = true;
        
        conf.innerHTML = `
          atOptions = {
            'key' : '${adKey}',
            'format' : '${format}',
            'height' : ${height},
            'width' : ${width},
            'params' : {}
          };
        `;

        bannerRef.current.append(conf);
        bannerRef.current.append(script);
      } catch (error) {
        console.error('AdBanner Error:', error);
      }
    }
  }, [adKey, height, width, format]);

  return (
    <div 
      className="flex justify-center items-center w-full overflow-hidden my-4 bg-gray-50/50 dark:bg-slate-900/50 rounded-lg" 
      style={{ 
        minHeight: `${height}px`, 
        minWidth: `${width}px`,
        aspectRatio: `${width} / ${height}`
      }}
    >
      <div 
        ref={bannerRef}
        className="w-full h-full flex justify-center items-center"
      />
    </div>
  );
}
