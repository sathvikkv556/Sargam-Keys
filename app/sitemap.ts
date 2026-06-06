import { MetadataRoute } from 'next';
import { getSongs } from '@/lib/actions/song';
import { getCategories } from '@/lib/actions/category';
import { lessons } from '@/lib/music-theory-data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sargamkeys.in';

  const [songsResponse, categoriesResponse] = await Promise.all([
    getSongs({ status: 'Published' }, { limit: 1000 }),
    getCategories(),
  ]);

  const songs = songsResponse.success ? songsResponse.data?.songs || [] : [];
  const categories = categoriesResponse.success ? categoriesResponse.data || [] : [];

  const songUrls = songs.map((song) => ({
    url: `${baseUrl}/notes/${song.slug}`,
    lastModified: song.updatedAt ? new Date(song.updatedAt) : new Date(song.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const theoryUrls = Object.keys(lessons).map((slug) => ({
    url: `${baseUrl}/music-theory/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/notes`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/music-theory`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/categories`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];

  return [...staticUrls, ...songUrls, ...categoryUrls, ...theoryUrls];
}
