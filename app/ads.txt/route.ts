export async function GET() {
  const adsContent = `google.com, pub-6224617757558738, DIRECT, f08c47fec0942fa0`;
  
  return new Response(adsContent, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}