import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getNoteById } from '@/lib/actions/note';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookOpen, GraduationCap, Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const response = await getNoteById(id);
  
  if (!response.success || !response.data) {
    return { title: 'Note Not Found' };
  }

  const note = response.data;
  return {
    title: `${note.title} | Music Theory | Raagakeys`,
    description: note.description,
  };
}

export default async function TheoryPage({ params }: PageProps) {
  const { id } = await params;
  const response = await getNoteById(id);

  if (!response.success || !response.data) {
    notFound();
  }

  const note = response.data;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" asChild className="mb-8 -ml-4 gap-2">
          <Link href="/notes?tab=theory">
            <ArrowLeft className="h-4 w-4" />
            Back to Library
          </Link>
        </Button>

        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge className="bg-blue-600 hover:bg-blue-700">
              {note.category.replace('-', ' ')}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {note.difficulty}
            </Badge>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            {note.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>Updated {new Date(note.updatedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCap className="h-4 w-4" />
              <span>Music Theory Guide</span>
            </div>
          </div>

          <p className="text-xl text-muted-foreground leading-relaxed">
            {note.description}
          </p>

          <Separator className="my-8" />

          <div className="prose prose-blue dark:prose-invert max-w-none">
            <div className="rounded-2xl border bg-card p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h2 className="text-2xl font-bold m-0">Guide Content</h2>
              </div>
              <div className="whitespace-pre-wrap font-sans leading-relaxed text-lg">
                {note.content}
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps / Related */}
        <div className="mt-16 rounded-3xl bg-slate-900 p-8 md:p-12 text-white">
          <h2 className="text-2xl font-bold mb-4">Master this concept?</h2>
          <p className="text-slate-300 mb-8 max-w-xl">
            Put your knowledge into practice by browsing songs that use this scale or technique.
          </p>
          <Button asChild size="lg" className="bg-white text-slate-900 hover:bg-slate-100">
            <Link href="/notes">Browse Songs</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
