import { Metadata } from 'next';

interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: string;
  author?: string;
  canonical?: string;
}

/**
 * Generates Next.js metadata for SEO
 */
export function generateMetadata(seo: SEOMetadata): Metadata {
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: seo.author ? [{ name: seo.author }] : undefined,
    alternates: seo.canonical ? { canonical: seo.canonical } : undefined,
    openGraph: {
      title: seo.title,
      description: seo.description,
      siteName: 'Raagakeys',
      type: (seo.ogType as any) || 'website',
      images: seo.ogImage ? [{ url: seo.ogImage }] : [{ url: '/next.svg' }], // Replace with actual default OG image
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.ogImage ? [seo.ogImage] : ['/next.svg'],
    },
  };
}

/**
 * Base SEO configuration
 */
export const baseSEO: SEOMetadata = {
  title: 'Raagakeys - Learn Piano Notes & Music Theory',
  description:
    'Master piano notes, scales, chords, and music theory with Raagakeys. Perfect for beginners to advanced musicians.',
  keywords: [
    'piano notes',
    'music theory',
    'scales',
    'chords',
    'piano lessons',
    'learn piano',
  ],
  author: 'Raagakeys',
  ogType: 'website',
};

/**
 * Generates metadata for individual pages
 */
export function createPageMetadata(
  pageTitle: string,
  pageDescription: string,
  pageKeywords?: string[],
  canonical?: string
): Metadata {
  return generateMetadata({
    title: `${pageTitle} | ${baseSEO.title}`,
    description: pageDescription,
    keywords: [...(baseSEO.keywords || []), ...(pageKeywords || [])],
    author: baseSEO.author,
    canonical,
  });
}
