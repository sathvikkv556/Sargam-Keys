import Link from 'next/link';
import { Music, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | SargamKeys',
  description: 'The page you are looking for does not exist or has been moved.',
};

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
        <Music className="h-12 w-12 text-blue-600 dark:text-blue-400" />
      </div>
      
      <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
        404 - Page Not Found
      </h1>
      
      <p className="mb-10 max-w-md text-lg text-muted-foreground">
        Oops! It seems the piano notes you are looking for have played their final chord or moved to a new stage.
      </p>
      
      <div className="flex flex-wrap justify-center gap-4">
        <Button asChild size="lg">
          <Link href="/" className="gap-2">
            <Home className="h-4 w-4" />
            Go Home
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link href="/search" className="gap-2">
            <Search className="h-4 w-4" />
            Search Notes
          </Link>
        </Button>
      </div>
      
      <div className="mt-16 text-sm text-muted-foreground">
        If you believe this is an error, please <Link href="/about" className="underline hover:text-primary">contact us</Link>.
      </div>
    </div>
  );
}
