import { getSongs } from '@/lib/actions/song';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://sargamkeys.in';
  
  const response = await getSongs(
    { status: 'Published' },
    { sort: { createdAt: -1 }, limit: 50 }
  );
  
  const songs = response.success ? response.data?.songs || [] : [];
  
  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>SargamKeys - Latest Piano Notes</title>
  <link>${baseUrl}</link>
  <description>Learn easy piano notes, keyboard notes, Bollywood songs, Hindi songs, and music theory on SargamKeys.</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
  ${songs.map(song => `
  <item>
    <title>${song.title} Piano Notes</title>
    <link>${baseUrl}/notes/${song.slug}</link>
    <guid>${baseUrl}/notes/${song.slug}</guid>
    <pubDate>${new Date(song.createdAt).toUTCString()}</pubDate>
    <description><![CDATA[Learn how to play ${song.title} ${song.movie ? `from ${song.movie}` : ''} on piano. Scale: ${song.scale}.]]></description>
  </item>`).join('')}
</channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
