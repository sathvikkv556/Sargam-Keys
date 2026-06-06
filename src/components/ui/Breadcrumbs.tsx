'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const pathname = usePathname();
  
  // If items are not provided, try to generate from pathname
  const generatedItems = items || pathname
    .split('/')
    .filter(Boolean)
    .map((segment, index, array) => {
      const href = `/${array.slice(0, index + 1).join('/')}`;
      const label = segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      
      return {
        label,
        href,
        active: index === array.length - 1
      };
    });

  const allItems = [
    { label: 'Home', href: '/', icon: <Home className="h-4 w-4" /> },
    ...generatedItems
  ];

  // Schema.org BreadcrumbList
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': allItems.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'name': item.label,
      'item': `https://sargamkeys.in${item.href}`
    }))
  };

  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)}>
      <ol className="flex flex-wrap items-center gap-2 text-sm font-medium text-muted-foreground">
        {allItems.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />}
            {item.active ? (
              <span className="text-foreground font-bold truncate max-w-[150px] sm:max-w-none" aria-current="page">
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="flex items-center gap-1 hover:text-blue-600 transition-colors"
              >
                {('icon' in item) && item.icon}
                <span>{item.label}</span>
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
