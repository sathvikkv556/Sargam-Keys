'use client';

import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

interface ClientThemeProviderProps {
  children: ReactNode;
}

/**
 * Client-side theme provider wrapper
 * Enables dark mode support with next-themes
 */
export function ClientThemeProvider({
  children,
}: ClientThemeProviderProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
