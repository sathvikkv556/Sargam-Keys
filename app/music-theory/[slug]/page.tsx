import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { 
  ArrowLeft, 
  ChevronRight, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Play, 
  Trophy, 
  Target,
  BookOpen,
  Music
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { lessons } from '@/lib/music-theory-data';
import { getSongs } from '@/lib/actions/song';
import { SongCard } from '@/components/SongCard';
import AnalyticsTracker from '@/components/AnalyticsTracker';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Helper to get song recommendations based on lesson
async function getSongPracticeRecommendations(lessonId: string) {
  let query: any = { status: 'Published' };
  
  if (lessonId === 'major-scales-intro' || lessonId === 'melody-construction') {
    query.scale = { $regex: /major/i };
  } else if (lessonId === 'natural-minor-scales' || lessonId === 'harmonic-minor-scales') {
    query.scale = { $regex: /minor/i };
  } else if (lessonId === 'bollywood-scale-secrets') {
    query.tags = { $in: ['Bollywood', 'Hindi'] };
  } else if (lessonId === 'triads-101' || lessonId === 'chord-progressions') {
    query.chords = { $exists: true, $ne: '' };
  }

  const response = await getSongs(query, { limit: 3, sort: { views: -1 } });
  return response.success ? response.data?.songs || [] : [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const lesson = lessons[slug];
  
  if (!lesson) return { title: 'Lesson Not Found' };

  return {
    title: `${lesson.title} | Music Theory | SargamKeys`,
    description: lesson.goal,
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug } = await params;
  const lesson = lessons[slug];

  if (!lesson) notFound();

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://sargamkeys.in/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Music Theory', 'item': 'https://sargamkeys.in/music-theory' },
      { '@type': 'ListItem', 'position': 3, 'name': lesson.title, 'item': `https://sargamkeys.in/music-theory/${slug}` }
    ]
  };

  const recommendedSongs = await getSongPracticeRecommendations(slug);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 pb-20">
      <AnalyticsTracker songId={`theory_${slug}`} />
      
      {/* Lesson Header */}
      <div className="border-b bg-slate-50/50 dark:bg-zinc-900/50 sticky top-0 z-10 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" asChild className="-ml-2">
                <Link href="/music-theory">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="hidden sm:inline">Back to Course</span>
                </Link>
              </Button>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex flex-col">
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Music Theory</span>
                <span className="text-sm font-bold truncate max-w-[200px] sm:max-w-none">{lesson.title}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
               <Badge variant="outline" className="hidden sm:flex">Learning</Badge>
               {lesson.nextLessonId && (
                 <Button size="sm" className="bg-blue-600 hover:bg-blue-700" asChild>
                   <Link href={`/music-theory/${lesson.nextLessonId}`}>
                     Next <ChevronRight className="h-4 w-4 ml-1" />
                   </Link>
                 </Button>
               )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs className="max-w-3xl mx-auto mb-8" />
        
        <div className="max-w-3xl mx-auto">
          {/* Intro */}
          <div className="space-y-6 mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">{lesson.title}</h1>
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
              <Target className="h-5 w-5 text-blue-600 mt-1 shrink-0" />
              <div>
                <p className="font-bold text-blue-900 dark:text-blue-100 text-sm uppercase tracking-wide">Goal</p>
                <p className="text-blue-800 dark:text-blue-200">{lesson.goal}</p>
              </div>
            </div>
          </div>

          {/* Content Renderer */}
          <div className="space-y-10">
            {lesson.content.map((block, idx) => {
              switch (block.type) {
                case 'heading':
                  const headingClasses: Record<number, string> = {
                    1: 'text-3xl font-bold mt-12 mb-4 scroll-m-20 border-b pb-2 first:mt-0',
                    2: 'text-2xl font-bold mt-10 mb-4 scroll-m-20 border-b pb-2',
                    3: 'text-xl font-bold mt-8 mb-2'
                  };
                  return (
                    <div key={idx} className={headingClasses[block.level] || headingClasses[2]}>
                      {block.text}
                    </div>
                  );
                
                case 'text':
                  return (
                    <p key={idx} className="text-lg leading-relaxed text-slate-700 dark:text-zinc-300 whitespace-pre-line" 
                       dangerouslySetInnerHTML={{ __html: block.text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-black dark:text-white">$1</strong>') }} 
                    />
                  );

                case 'callout':
                  return (
                    <div key={idx} className="flex gap-4 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border shadow-sm">
                      <span className="text-2xl">{block.icon}</span>
                      <div>
                        <p className="font-bold mb-1">{block.title}</p>
                        <p className="text-muted-foreground">{block.text}</p>
                      </div>
                    </div>
                  );

                case 'list':
                  return (
                    <ul key={idx} className="space-y-3 list-none pl-0">
                      {block.items.map((item: string, i: number) => (
                        <li key={i} className="flex gap-3 text-lg leading-relaxed text-slate-700 dark:text-zinc-300">
                          <span className="text-blue-600 font-bold">•</span>
                          <span dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-black dark:text-white">$1</strong>') }} />
                        </li>
                      ))}
                    </ul>
                  );

                case 'steps':
                  return (
                    <div key={idx} className="space-y-6">
                      {block.items.map((item: string, i: number) => (
                        <div key={i} className="flex gap-4 group">
                          <div className="flex flex-col items-center">
                            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold shrink-0">
                              {i + 1}
                            </div>
                            {i < block.items.length - 1 && <div className="w-0.5 h-full bg-slate-100 dark:bg-zinc-800 mt-2" />}
                          </div>
                          <div className="pt-0.5 pb-4">
                            <p className="text-lg leading-relaxed text-slate-700 dark:text-zinc-300"
                               dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, '<strong class="text-black dark:text-white">$1</strong>') }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  );

                case 'practice':
                  return (
                    <div key={idx} className="my-8 rounded-3xl border-2 border-green-500/20 bg-green-50/30 dark:bg-green-900/10 overflow-hidden">
                      <div className="bg-green-600 px-6 py-4 text-white flex items-center gap-2">
                        <Play className="h-5 w-5 fill-current" />
                        <h3 className="font-bold text-lg">{block.title}</h3>
                      </div>
                      <div className="p-6 space-y-4">
                        {block.steps.map((step: string, i: number) => (
                          <div key={i} className="flex gap-3 items-start">
                            <CheckCircle2 className="h-5 w-5 text-green-600 mt-1 shrink-0" />
                            <p className="text-slate-800 dark:text-zinc-200">{step}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );

                case 'mini-exercise':
                  return (
                    <div key={idx} className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-100 dark:border-purple-800">
                      <div className="flex items-center gap-2 mb-4">
                        <Trophy className="h-5 w-5 text-purple-600" />
                        <p className="font-bold text-purple-900 dark:text-purple-100 uppercase tracking-wider text-xs">Mini Exercise</p>
                      </div>
                      <p className="text-lg font-medium text-purple-800 dark:text-purple-200 italic">
                        "{block.challenge}"
                      </p>
                    </div>
                  );

                case 'mistake':
                  return (
                    <div key={idx} className="flex gap-4 p-6 rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900">
                      <AlertCircle className="h-6 w-6 text-red-600 shrink-0" />
                      <div>
                        <p className="font-bold text-red-900 dark:text-red-100 mb-1">{block.title}</p>
                        <p className="text-red-800 dark:text-red-200">{block.text}</p>
                      </div>
                    </div>
                  );

                case 'table':
                   return (
                     <div key={idx} className="my-6 overflow-hidden rounded-xl border">
                       <table className="w-full text-left border-collapse">
                         <thead>
                           <tr className="bg-slate-50 dark:bg-zinc-900 border-b">
                             {block.headers.map((h: string, i: number) => (
                               <th key={i} className="px-4 py-3 font-bold text-sm">{h}</th>
                             ))}
                           </tr>
                         </thead>
                         <tbody>
                           {block.rows.map((row: string[], i: number) => (
                             <tr key={i} className="border-b last:border-0 hover:bg-slate-50/50 dark:hover:bg-zinc-900/50">
                               {row.map((cell: string, j: number) => (
                                 <td key={j} className="px-4 py-3 text-sm">{cell}</td>
                               ))}
                             </tr>
                           ))}
                         </tbody>
                       </table>
                     </div>
                   );

                case 'recap':
                  return (
                    <div key={idx} className="mt-16 p-8 rounded-3xl bg-slate-900 text-white">
                      <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-yellow-400" />
                        Quick Recap
                      </h3>
                      <div className="space-y-4">
                        {block.items.map((item: string, i: number) => (
                          <div key={i} className="flex gap-3">
                            <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-2 shrink-0" />
                            <p className="text-slate-300">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </div>

          {/* Practice with Songs */}
          {recommendedSongs.length > 0 && (
            <div className="mt-20 space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-3xl font-bold flex items-center gap-3">
                    <Music className="h-8 w-8 text-blue-600" />
                    Apply Your Knowledge
                  </h2>
                  <p className="text-muted-foreground">Practice what you just learned with these songs</p>
                </div>
                <Button variant="outline" asChild>
                  <Link href="/notes">Browse All Songs</Link>
                </Button>
              </div>
              
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {recommendedSongs.map((song: any) => (
                  <SongCard key={song._id.toString()} song={song} />
                ))}
              </div>
            </div>
          )}

          {/* Next Lesson Footer */}
          {lesson.nextLessonId && (
            <div className="mt-20 p-8 md:p-12 rounded-3xl bg-blue-600 text-white text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 blur-3xl opacity-30 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                <div className="aspect-square h-[300px] rounded-full bg-white" />
              </div>
              
              <p className="text-blue-100 font-medium mb-2 relative z-10 uppercase tracking-widest text-xs">Ready for more?</p>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 relative z-10">
                Up Next: {lessons[lesson.nextLessonId]?.title}
              </h2>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 rounded-full px-8 h-14 text-lg relative z-10" asChild>
                <Link href={`/music-theory/${lesson.nextLessonId}`}>
                  Continue Learning <ChevronRight className="h-5 w-5 ml-1" />
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>

      <script
        id={`breadcrumb-jsonld-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
    </div>
  );
}
