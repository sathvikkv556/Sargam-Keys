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
      const conf = document.createElement('script');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.highperformanceformat.com/${adKey}/invoke.js`;
      
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
    }
  }, [adKey, height, width, format]);

  return (
    <div 
      className="flex justify-center items-center w-full overflow-hidden" 
      ref={bannerRef}
      style={{ minHeight: height, minWidth: width }}
    />
  );
}
