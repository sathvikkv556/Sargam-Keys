'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { MoreVertical, ChevronRight } from 'lucide-react';
import { getCategories } from '@/lib/actions/category';
import { Category } from '@/types';

/**
 * Header component with navigation and theme toggle
 */
export function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    setMounted(true);
    const fetchCategories = async () => {
      const response = await getCategories();
      if (response.success) {
        setCategories(response.data || []);
      }
    };
    fetchCategories();
  }, []);

  const currentTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-1">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group transition-all duration-300">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 group-hover:scale-105 transition-all">
                <div className="text-xl font-bold text-white filter drop-shadow-sm">
                  🎹
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-green-500 dark:border-gray-900" />
              </div>
              <div className="flex flex-col">
                <span className="font-playfair text-xl font-black tracking-tight text-gray-900 dark:text-white leading-none group-hover:text-blue-600 transition-colors">
                  SARGAMKEYS
                </span>
              
              </div>
            </Link>

            {/* Category Menu (Three Dots) */}
            <div className="relative ml-1">
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="flex items-center rounded-full p-1 text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
                aria-label="Categories menu"
              >
                <MoreVertical className="h-5 w-5" />
              </button>

              {showMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowMenu(false)} 
                  />
                  <div className="absolute left-0 mt-2 z-50 w-56 origin-top-left rounded-xl border border-gray-200 bg-white py-2 shadow-xl dark:border-gray-800 dark:bg-gray-900 ring-1 ring-black ring-opacity-5">
                    <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800 mb-1">
                      Categories
                    </div>
                    <div className="max-h-[70vh] overflow-y-auto">
                      {categories.length > 0 ? (
                        categories.map((cat) => (
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
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/notes"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Notes
            </Link>
            <Link
              href="/categories"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Categories
            </Link>
            <Link
              href="/search"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              Search
            </Link>
            <Link
              href="/about"
              className="text-gray-600 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              About
            </Link>
          </nav>

          {/* Theme Toggle */}
          {mounted && (
            <button
              onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg bg-gray-100 p-2 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              aria-label="Toggle theme"
            >
              {currentTheme === 'dark' ? '☀️' : '🌙'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
