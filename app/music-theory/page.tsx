import { Metadata } from 'next';
import Link from 'next/link';
import { 
  BookOpen, 
  ChevronRight, 
  Play, 
  CheckCircle2, 
  Circle, 
  Layout, 
  Music, 
  Layers, 
  Zap,
  GraduationCap,
  Star,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Music Theory: Zero to Hero | Piano Course | SargamKeys',
  description: 'Master the piano from absolute zero with our structured, Notion-style learning path. Chords, scales, rhythm, and more.',
};

const curriculum = [
  {
    title: 'Module 1: The Basics (Absolute Zero)',
    lessons: [
      { id: 'meet-your-keyboard', title: 'Meet Your Keyboard', duration: '5 min', difficulty: 'Beginner', description: 'Understanding white and black keys and finding Middle C.' },
      { id: 'finger-numbers-posture', title: 'Finger Numbers & Posture', duration: '7 min', difficulty: 'Beginner', description: 'How to sit and how to use your fingers effectively.' },
      { id: 'first-notes-and-rhythm', title: 'Playing First Notes', duration: '10 min', difficulty: 'Beginner', description: 'Your first melodies and basic rhythm concepts.' },
    ]
  },
  {
    title: 'Module 2: Scales & Melodies',
    lessons: [
      { id: 'major-scales-intro', title: 'Intro to Major Scales', duration: '15 min', difficulty: 'Beginner', description: 'The "Happy" sound: C Major and beyond.' },
      { id: 'melody-construction', title: 'Playing Your First Song', duration: '12 min', difficulty: 'Beginner', description: 'Play "Mary Had a Little Lamb" using the C Major scale.' },
    ]
  },
  {
    title: 'Module 3: Chords & Harmony',
    lessons: [
      { id: 'triads-101', title: 'Triads 101: Major & Minor', duration: '20 min', difficulty: 'Intermediate', description: 'The building blocks of every song.' },
      { id: 'chord-progressions', title: 'The Magic 4 Chords', duration: '15 min', difficulty: 'Intermediate', description: 'Learn the "Magic 4 Chords" used in thousands of songs.' },
      { id: 'hand-coordination', title: 'Hand Coordination', duration: '25 min', difficulty: 'Intermediate', description: 'Playing different things with your left and right hand.' },
    ]
  },
  {
    title: 'Module 4: Scale Masterclass',
    lessons: [
      { id: 'natural-minor-scales', title: 'The Natural Minor Scale', duration: '15 min', difficulty: 'Intermediate', description: 'Explore the emotional and serious side of music.' },
      { id: 'harmonic-minor-scales', title: 'The Harmonic Minor Scale', duration: '15 min', difficulty: 'Intermediate', description: 'Learn the exotic, "Egyptian" sound.' },
      { id: 'melodic-minor-scales', title: 'The Melodic Minor Scale', duration: '15 min', difficulty: 'Intermediate', description: 'The classical scale with a "Split Personality".' },
      { id: 'pentatonic-blues-scales', title: 'Pentatonic & Blues', duration: '20 min', difficulty: 'Advanced', description: 'The secret scales of Rock, Jazz, and Pop.' },
      { id: 'scale-cheat-sheet', title: 'Master Scale Cheat Sheet', duration: '10 min', difficulty: 'Advanced', description: 'Every formula in one place.' },
    ]
  },
  {
    title: 'Module 5: The Modes Masterclass',
    lessons: [
      { id: 'intro-to-modes', title: 'What are Modes?', duration: '10 min', difficulty: 'Intermediate', description: 'Understand the concept of musical "colors".' },
      { id: 'dorian-phrygian-modes', title: 'Dorian & Phrygian', duration: '15 min', difficulty: 'Intermediate', description: 'The "Cool" and "Dark" modes of music.' },
      { id: 'lydian-mixolydian-modes', title: 'Lydian & Mixolydian', duration: '15 min', difficulty: 'Intermediate', description: 'The "Spacey" and "Bluesy" modes of music.' },
    ]
  },
  {
    title: 'Module 6: Technical Mastery',
    lessons: [
      { id: 'scale-fingering-mastery', title: 'Scale Fingering (All Keys)', duration: '20 min', difficulty: 'Intermediate', description: 'Universal rules for playing any scale smoothly.' },
      { id: 'arpeggios-basics', title: 'Arpeggio Basics', duration: '15 min', difficulty: 'Intermediate', description: 'Learn to play "Broken Chords" across the keyboard.' },
    ]
  },
  {
    title: 'Module 7: Bollywood & Fusion Secrets',
    lessons: [
      { id: 'bollywood-scale-secrets', title: 'Bollywood Scales', duration: '20 min', difficulty: 'Intermediate', description: 'The specific modes and "grace notes" used in Indian hits.' },
    ]
  },
  {
    title: 'Module 8: The Pro Musician\'s Toolkit',
    lessons: [
      { id: 'reading-music-101', title: 'Reading Sheet Music', duration: '15 min', difficulty: 'Beginner', description: 'Translate notes on paper to keys on the piano.' },
      { id: 'jazz-harmony-basics', title: 'Intro to Jazz Chords', duration: '20 min', difficulty: 'Advanced', description: 'Master 7th chords for a rich, professional sound.' },
      { id: 'art-of-transposition', title: 'The Art of Transposition', duration: '15 min', difficulty: 'Advanced', description: 'Shift any song to any key instantly.' },
    ]
  },
  {
    title: 'Module 9: Advanced Practice & Improv',
    lessons: [
      { id: 'chromatic-whole-tone', title: 'Advanced Scales', duration: '15 min', difficulty: 'Advanced', description: 'Explore scales beyond Major and Minor.' },
      { id: 'circle-of-fifths', title: 'The Circle of Fifths', duration: '20 min', difficulty: 'Advanced', description: 'The ultimate roadmap for all 12 keys.' },
      { id: 'pro-practice-tips', title: 'Pro Practice Tips', duration: '15 min', difficulty: 'Advanced', description: 'How to practice like a professional for 10x gains.' },
      { id: 'basic-improvisation', title: 'Intro to Improvisation', duration: '20 min', difficulty: 'Advanced', description: 'Creating your own music on the fly.' },
    ]
  }
];




export default function MusicTheoryHub() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#0A0A0A]">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b bg-white dark:bg-black py-16 md:py-24">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 blur-3xl opacity-20 pointer-events-none">
          <div className="aspect-square h-[600px] rounded-full bg-gradient-to-br from-blue-600 to-purple-600" />
        </div>
        
        <div className="container relative mx-auto px-4">
          <div className="max-w-3xl">
            <Badge className="mb-4 px-3 py-1 text-sm font-medium bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
              Interactive Course
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Music Theory <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Zero to Hero
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl">
              A modern, step-by-step path to mastering the piano. 
              No academic fluff. Just practical, powerful lessons designed 
              to get you playing your favorite songs faster.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8 gap-2 bg-blue-600 hover:bg-blue-700 h-14 text-lg" asChild>
                <Link href="/music-theory/meet-your-keyboard">
                  Start Learning <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg bg-white dark:bg-transparent">
                View Curriculum
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-[1fr_350px] gap-12">
          {/* Curriculum */}
          <div className="space-y-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Curriculum</h2>
              <p className="text-muted-foreground">Follow this path to go from absolute zero to advanced playing.</p>
            </div>

            <div className="space-y-8">
              {curriculum.map((module, idx) => (
                <div key={idx} className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-sm">
                      {idx + 1}
                    </span>
                    {module.title}
                  </h3>
                  <div className="grid gap-4">
                    {module.lessons.map((lesson) => (
                      <Link 
                        key={lesson.id} 
                        href={`/music-theory/${lesson.id}`}
                        className="group relative flex items-center gap-4 p-4 rounded-2xl border bg-white dark:bg-zinc-900 hover:border-blue-500/50 hover:shadow-lg transition-all"
                      >
                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-slate-50 dark:bg-zinc-800 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                          <Play className="h-5 w-5 fill-current" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold truncate">{lesson.title}</span>
                            <Badge variant="secondary" className="text-[10px] h-4 px-1 capitalize">
                              {lesson.difficulty}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{lesson.description}</p>
                        </div>
                        <div className="hidden md:flex flex-col items-end text-xs text-muted-foreground gap-1 pr-2">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" /> {lesson.duration}
                          </span>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-blue-500 transition-colors" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <Card className="rounded-3xl border-2 border-blue-100 dark:border-blue-900/30 overflow-hidden">
              <div className="bg-blue-600 p-6 text-white">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  Course Features
                </h3>
              </div>
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                    <Layout className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Notion Style</p>
                    <p className="text-xs text-muted-foreground">Clean, structured, and easy to follow notes.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600 shrink-0">
                    <Music className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Practical First</p>
                    <p className="text-xs text-muted-foreground">Learn theory through actual songs and exercises.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-8 w-8 rounded-lg bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600 shrink-0">
                    <Layers className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Progressive Path</p>
                    <p className="text-xs text-muted-foreground">From absolute zero to advanced improvisation.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-3xl bg-slate-900 text-white border-none">
              <CardHeader>
                <CardTitle>Daily Practice</CardTitle>
                <CardDescription className="text-slate-400">
                  Consistency is key. 15 mins a day is better than 2 hours once a week.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  <span>5 mins Finger Exercises</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  <span>5 mins Current Lesson</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-blue-400" />
                  <span>5 mins Song Practice</span>
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">
                  Download Practice Log
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
