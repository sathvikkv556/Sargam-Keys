export async function GET() {
  // Removed spaces after commas as some systems are sensitive to it
  const content = `google.com,pub-7760317183284359,DIRECT,f08c47fec0942fa0\n`;
  
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
    },
  });
}
