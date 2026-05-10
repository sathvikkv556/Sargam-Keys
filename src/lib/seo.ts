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

const siteUrl = 'https://sargamkeys.in';

/**
 * Generates Next.js metadata for SEO
 */
export function generateMetadata(seo: SEOMetadata): Metadata {
  const canonicalUrl = seo.canonical
    ? `${siteUrl}${seo.canonical}`
    : siteUrl;

  return {
    metadataBase: new URL(siteUrl),

    title: seo.title,

    description: seo.description,

    keywords: seo.keywords,

    authors: seo.author ? [{ name: seo.author }] : undefined,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonicalUrl,
      siteName: 'SargamKeys',
      type: (seo.ogType as any) || 'website',

      images: [
        {
          url: seo.ogImage || `${siteUrl}/default.png`,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: [seo.ogImage || `${siteUrl}/default.png`],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Base SEO configuration
 */
export const baseSEO: SEOMetadata = {
  title: 'SargamKeys - Piano Notes & Keyboard Notes',

  description:
    'Learn easy piano notes, keyboard notes, Bollywood songs, Hindi songs, and music theory on SargamKeys.',

  keywords: [
    'piano notes',
    'keyboard notes',
    'hindi piano notes',
    'bollywood piano notes',
    'easy keyboard notes',
    'music theory',
    'learn piano',
  ],

  author: 'SargamKeys',

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
    title: pageTitle,

    description: pageDescription,

    keywords: [
      ...(baseSEO.keywords || []),
      ...(pageKeywords || []),
    ],

    author: baseSEO.author,

    canonical,
  });
}