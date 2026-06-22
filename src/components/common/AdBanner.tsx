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
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on client side and if container exists
    if (typeof window === 'undefined' || !containerRef.current) return;

    // Clear existing content to avoid double injection or residual ads
    containerRef.current.innerHTML = '';

    try {
      if (type === 'banner') {
        // Create an isolated iframe for the banner
        const iframe = document.createElement('iframe');
        iframe.width = String(width || '');
        iframe.height = String(height || '');
        iframe.style.border = 'none';
        iframe.style.overflow = 'hidden';
        iframe.style.display = 'block';
        iframe.setAttribute('scrolling', 'no');
        iframe.title = `Ad-${adKey}`;

        containerRef.current.appendChild(iframe);

        // Write the ad code inside the isolated iframe document
        const doc = iframe.contentDocument || iframe.contentWindow?.document;
        if (doc) {
          doc.open();
          doc.write(`
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body {
                    margin: 0;
                    padding: 0;
                    overflow: hidden;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    background: transparent;
                  }
                </style>
              </head>
              <body>
                <script type="text/javascript">
                  window.atOptions = {
                    'key' : '${adKey}',
                    'format' : '${format}',
                    'height' : ${height},
                    'width' : ${width},
                    'params' : {}
                  };
                </script>
                <script type="text/javascript" src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>
              </body>
            </html>
          `);
          doc.close();
        }
      } else if (type === 'native') {
        // Keep the native code execution path as-is since it doesn't conflict
        const container = document.createElement('div');
        container.id = `container-${adKey}`;
        containerRef.current.appendChild(container);

        const script = document.createElement('script');
        script.async = true;
        script.setAttribute('data-cfasync', 'false');
        script.src = `https://pl29418313.effectivecpmnetwork.com/${adKey}/invoke.js`;
        
        containerRef.current.appendChild(script);
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
        ref={containerRef}
        className="w-full h-full flex justify-center items-center"
      />
    </div>
  );
}
