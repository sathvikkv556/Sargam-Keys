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
    if (bannerRef.current && !bannerRef.current.firstChild) {
      try {
        if (type === 'banner') {
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
        } else if (type === 'native') {
          const script = document.createElement('script');
          script.async = true;
          script.setAttribute('data-cfasync', 'false');
          script.src = `https://pl29418313.effectivecpmnetwork.com/${adKey}/invoke.js`;
          
          const container = document.createElement('div');
          container.id = `container-${adKey}`;
          
          bannerRef.current.append(script);
          bannerRef.current.append(container);
        }
      } catch (error) {
        console.error('AdBanner Error:', error);
      }
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
