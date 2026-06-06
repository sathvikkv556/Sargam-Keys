'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MoreVertical, ChevronRight, Sun, Moon, Search, BookOpen, Music, Info } from 'lucide-react';
import { Category } from '@/types';

interface HeaderClientProps {
  initialCategories: Category[];
}

/**
 * Header component with navigation and theme toggle (Client Side)
 */
export function HeaderClient({ initialCategories }: HeaderClientProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    // Using a microtask or timeout to avoid the cascading render warning
    // which sometimes happens in Next.js 15+ with strict mode and theme providers
    const frame = requestAnimationFrame(() => {
      setMounted(true);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  // Use a ref or simple boolean if possible, but for next-themes, we usually need state.
  // To avoid the cascading render warning, we can ensure we only render the theme toggle 
  // after mount. The warning might be because of how we use the state.
  // Actually, standard practice for next-themes is:
  // if (!mounted) return null; // or a placeholder
  // But we want the Header to be visible, just not the theme toggle.


  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80 transition-all">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group transition-all duration-300" aria-label="SargamKeys Home">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all">
                <Image 
                  src="/logo.jpg" 
                  alt="SargamKeys Logo" 
                  width={40} 
                  height={40} 
                  className="h-full w-full object-cover"
                  priority
                  fetchPriority="high"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-gray-900 dark:text-white leading-none group-hover:text-blue-600 transition-colors">
                  SARGAMKEYS
                </span>
              </div>
            </Link>

            {/* Category Menu (Three Dots) */}
            <div className="relative ml-1">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center rounded-full p-2 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                aria-label="Categories menu"
                aria-expanded={showMenu}
              >
                <MoreVertical className="h-5 w-5" />
              </button>

              {showMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowMenu(false)} 
                  />
                  <div className="absolute left-0 mt-2 z-50 w-56 origin-top-left rounded-xl border border-gray-200 bg-white py-2 shadow-xl dark:border-gray-800 dark:bg-gray-900 ring-1 ring-black ring-opacity-5 animate-in fade-in zoom-in duration-200">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 mb-1">
                      Explore Genres
                    </div>
                    <div className="max-h-[70vh] overflow-y-auto">
                      {initialCategories.length > 0 ? (
                        initialCategories.map((cat) => (
                          <Link
                            key={cat._id}
                            href={`/categories/${cat.slug}`}
                            onClick={() => setShowMenu(false)}
                            className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white transition-colors"
                          >
                            <span>{cat.name}</span>
                            <ChevronRight className="h-3 w-3 opacity-50" />
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-500 italic">
                          No categories found
                        </div>
                      )}
                    </div>
                    <div className="mt-1 border-t border-gray-100 dark:border-gray-800 pt-1">
                      <Link
                        href="/categories"
                        onClick={() => setShowMenu(false)}
                        className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-800 transition-colors"
                      >
                        View All Categories
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href="/notes"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
            >
              <Music className="h-4 w-4" />
              Notes
            </Link>
            <Link
              href="/music-theory"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
            >
              <BookOpen className="h-4 w-4" />
              Theory
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
            >
              <Search className="h-4 w-4" />
              Search
            </Link>
            <Link
              href="/about"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-gray-600 transition-colors hover:text-blue-600 hover:bg-blue-50 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-800"
            >
              <Info className="h-4 w-4" />
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
                className="flex items-center justify-center rounded-lg bg-gray-100 p-2 text-gray-600 transition-colors hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                aria-label={`Switch to ${currentTheme === 'dark' ? 'light' : 'dark'} theme`}
              >
                {currentTheme === 'dark' ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
