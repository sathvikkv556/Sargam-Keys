export async function GET() {
  const content = 'google.com, pub-7760317183284359, DIRECT, f08c47fec0942fa0\n';
  
  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
