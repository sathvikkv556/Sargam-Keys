export interface Lesson {
  id: string;
  title: string;
  goal: string;
  content: any[]; // Using a structured format for Notion-style rendering
  nextLessonId?: string;
}

export const lessons: Record<string, Lesson> = {
  'meet-your-keyboard': {
    id: 'meet-your-keyboard',
    title: 'Meet Your Keyboard',
    goal: 'Understand the layout of white and black keys and find Middle C.',
    content: [
      {
        type: 'callout',
        icon: '💡',
        title: 'Fun Fact',
        text: 'A standard piano has 88 keys. But don\'t worry—the pattern just repeats over and over!'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Secret Pattern'
      },
      {
        type: 'text',
        text: 'Look at the black keys. Notice anything? They are always in groups of **2** and **3**.'
      },
      {
        type: 'list',
        items: [
          '**Group of 2:** These look like "twins".',
          '**Group of 3:** These look like "triplets".'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'Finding Middle C'
      },
      {
        type: 'text',
        text: 'Middle C is the most important note for beginners. Here is how to find it:'
      },
      {
        type: 'steps',
        items: [
          'Find a group of **2 black keys**.',
          'The white key directly to the **left** of the 2 black keys is **C**.',
          'Find the C that is closest to the **middle** of your keyboard. That is **Middle C**!'
        ]
      },
      {
        type: 'practice',
        title: 'Try This Now',
        steps: [
          'Find all the "groups of 2" on your keyboard.',
          'Find all the "groups of 3" on your keyboard.',
          'Find and play every "C" on your keyboard (the note to the left of the 2 black keys).'
        ]
      },
      {
        type: 'mini-exercise',
        challenge: 'Close your eyes, move your hand anywhere on the keyboard, and see if you can find Middle C by feel (using the 2 black keys)!'
      },
      {
        type: 'mistake',
        title: 'Common Mistake',
        text: 'Don\'t confuse C with F! F is to the left of the group of **3** black keys. Always look for the **2** black keys for C.'
      },
      {
        type: 'recap',
        items: [
          'Black keys come in groups of 2 and 3.',
          'C is to the left of the 2 black keys.',
          'Middle C is the center of your piano world.'
        ]
      }
    ],
    nextLessonId: 'finger-numbers-posture'
  },
  'finger-numbers-posture': {
    id: 'finger-numbers-posture',
    title: 'Finger Numbers & Posture',
    goal: 'Learn how to sit properly and how to use your fingers effectively.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Finger Numbers'
      },
      {
        type: 'text',
        text: 'In piano, we don\'t use names like "index" or "thumb". We use numbers 1 to 5.'
      },
      {
        type: 'table',
        headers: ['Number', 'Finger'],
        rows: [
          ['1', 'Thumb'],
          ['2', 'Index'],
          ['3', 'Middle'],
          ['4', 'Ring'],
          ['5', 'Pinky']
        ]
      },
      {
        type: 'callout',
        icon: '✋',
        title: 'Pro Tip',
        text: 'Both hands use the same numbers! Thumb is always 1, Pinky is always 5.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Perfect Posture'
      },
      {
        type: 'list',
        items: [
          '**Sit Tall:** Don\'t slouch. Imagine a string pulling you up from the top of your head.',
          '**Feet Flat:** Keep both feet on the floor for balance.',
          '**Relaxed Shoulders:** Let your arms hang naturally.',
          '**Curved Fingers:** Imagine you are holding a small orange or a tennis ball. Never play with flat fingers!'
        ]
      },
      {
        type: 'practice',
        title: 'Hand Position Challenge',
        steps: [
          'Place your right hand thumb (Finger 1) on Middle C.',
          'Let your other fingers rest naturally on the next 4 white keys.',
          'Press each key one by one (1-2-3-4-5) while keeping your hand curved like a "claw".'
        ]
      },
      {
        type: 'recap',
        items: [
          'Thumb is 1, Pinky is 5.',
          'Keep your fingers curved (hold the orange).',
          'Sit tall and relax.'
        ]
      }
    ],
    nextLessonId: 'first-notes-and-rhythm'
  },
  'first-notes-and-rhythm': {
    id: 'first-notes-and-rhythm',
    title: 'Playing First Notes & Basic Rhythm',
    goal: 'Learn the names of white keys and understand how rhythm works.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The Musical Alphabet'
      },
      {
        type: 'text',
        text: 'The musical alphabet only has 7 letters: **A - B - C - D - E - F - G**.'
      },
      {
        type: 'callout',
        icon: '🔄',
        title: 'It Loops!',
        text: 'After G, you just start over at A again. A-B-C-D-E-F-G-A-B-C...'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Rhythm: The Heartbeat of Music'
      },
      {
        type: 'text',
        text: 'Music is divided into "beats". Think of it like a clock ticking.'
      },
      {
        type: 'table',
        headers: ['Note Type', 'Name', 'Duration'],
        rows: [
          ['𝅝', 'Whole Note', '4 Beats'],
          ['𝅗𝅥', 'Half Note', '2 Beats'],
          ['𝅘𝅥', 'Quarter Note', '1 Beat']
        ]
      },
      {
        type: 'practice',
        title: 'Clap the Rhythm',
        steps: [
          'Set a steady beat (clap 1, 2, 3, 4).',
          'Quarter Notes: Clap on every beat (Clap-Clap-Clap-Clap).',
          'Half Notes: Clap once and hold for two beats (Clap-hold, Clap-hold).',
          'Whole Note: Clap once and hold for all four beats (Clap-hold-hold-hold).'
        ]
      },
      {
        type: 'mini-exercise',
        challenge: 'Play Middle C as a Whole Note (4 beats), then D as two Half Notes (2 beats each), then E, F, G, A as Quarter Notes (1 beat each)!'
      },
      {
        type: 'recap',
        items: [
          'Musical alphabet: A to G.',
          'Rhythm is measured in beats.',
          'Quarter = 1, Half = 2, Whole = 4.'
        ]
      }
    ],
    nextLessonId: 'major-scales-intro'
  },
  'major-scales-intro': {
    id: 'major-scales-intro',
    title: 'Intro to Major Scales',
    goal: 'Learn the construction of a Major scale and play your first C Major scale.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'What is a Scale?'
      },
      {
        type: 'text',
        text: 'A scale is a sequence of notes that sound "right" together. The Major scale is the most common and sounds "Happy".'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Magic Formula'
      },
      {
        type: 'text',
        text: 'Every Major scale follows a specific pattern of Whole steps (W) and Half steps (H).'
      },
      {
        type: 'callout',
        icon: '📏',
        title: 'Steps Defined',
        text: '**Half Step (H):** The very next key (black or white).\n**Whole Step (W):** Two half steps (skip one key).'
      },
      {
        type: 'steps',
        items: [
          'Start on any note (e.g., C).',
          'Move: **W - W - H - W - W - W - H**.',
          'You just built a Major Scale!'
        ]
      },
      {
        type: 'practice',
        title: 'The C Major Scale',
        steps: [
          'Start on C.',
          'Play only white keys from C to the next C.',
          'Notes: C - D - E - F - G - A - B - C.',
          'Notice how there are no black keys between E-F and B-C? Those are the Half Steps!'
        ]
      },
      {
        type: 'recap',
        items: [
          'Major scale = Happy sound.',
          'Formula: W-W-H-W-W-W-H.',
          'C Major is all white keys.'
        ]
      }
    ],
    nextLessonId: 'melody-construction'
  },
  'melody-construction': {
    id: 'melody-construction',
    title: 'Playing Your First Song',
    goal: 'Use the C Major scale to play "Mary Had a Little Lamb" and understand melody skips.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Steps vs. Skips'
      },
      {
        type: 'text',
        text: 'Melodies move in two ways:\n1. **Steps:** Moving to the very next note (C to D).\n2. **Skips:** Jumping over a note (C to E).'
      },
      {
        type: 'practice',
        title: 'Your First Song: Mary Had a Little Lamb',
        steps: [
          'Place your Right Hand on C-D-E-F-G (Finger 1 on C).',
          'Play this sequence: **E - D - C - D - E - E - E** (3-2-1-2-3-3-3).',
          'Continue: **D - D - D** (2-2-2) then **E - G - G** (3-5-5).',
          'Repeat the first line: **E - D - C - D - E - E - E**.',
          'Finish: **E - D - D - E - D - C** (3-2-2-3-2-1).'
        ]
      },
      {
        type: 'callout',
        icon: '🎵',
        title: 'Ear Challenge',
        text: 'Can you hear where the "skips" are? (Hint: Look at the G!)'
      },
      {
        type: 'recap',
        items: [
          'Melodies move by steps and skips.',
          'You just played your first song using only 5 notes!',
          'Keep your hand in one "position" for now.'
        ]
      }
    ],
    nextLessonId: 'triads-101'
  },
  'triads-101': {
    id: 'triads-101',
    title: 'Triads 101: Major & Minor Chords',
    goal: 'Learn how to build the two most important types of chords.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'What is a Chord?'
      },
      {
        type: 'text',
        text: 'A chord is when you play 3 or more notes at the same time. A **Triad** is a 3-note chord built with "Skips".'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The 1-3-5 Rule'
      },
      {
        type: 'text',
        text: 'To build a triad, take the **1st**, **3rd**, and **5th** notes of a scale.'
      },
      {
        type: 'table',
        headers: ['Chord Name', 'Notes', 'Quality'],
        rows: [
          ['C Major', 'C - E - G', 'Happy / Bright'],
          ['A Minor', 'A - C - E', 'Sad / Dark'],
          ['G Major', 'G - B - D', 'Strong / Heroic'],
          ['F Major', 'F - A - C', 'Warm / Peaceful']
        ]
      },
      {
        type: 'practice',
        title: 'Building Chords',
        steps: [
          'Right Hand: Play C, E, and G together using fingers **1 - 3 - 5**.',
          'Notice how your fingers naturally "skip" one white key between each note.',
          'Now move that same hand shape down to A, C, and E. That is A Minor!'
        ]
      },
      {
        type: 'mistake',
        title: 'Cluttered Chords',
        text: 'Make sure all 3 notes ring out clearly. If one sounds "thumpy", check if your fingers are curved!'
      },
      {
        type: 'recap',
        items: [
          'Triads = 3 notes (1-3-5).',
          'Major chords sound happy, Minor sound sad.',
          'Use fingers 1, 3, and 5 for stability.'
        ]
      }
    ],
    nextLessonId: 'chord-progressions'
  },
  'chord-progressions': {
    id: 'chord-progressions',
    title: 'The Magic 4 Chords',
    goal: 'Play thousands of songs using just one simple sequence of chords.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The Secret of Pop Music'
      },
      {
        type: 'text',
        text: 'Did you know that songs by Adele, Ed Sheeran, and Bollywood hits often use the **exact same 4 chords**?'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The "Magic 4" in C Major'
      },
      {
        type: 'list',
        items: [
          '**C Major** (The Home)',
          '**G Major** (The Journey)',
          '**A Minor** (The Emotion)',
          '**F Major** (The Peace)'
        ]
      },
      {
        type: 'practice',
        title: 'The 4-Chord Loop',
        steps: [
          'Play **C Major** (C-E-G) for 4 beats.',
          'Play **G Major** (G-B-D) for 4 beats.',
          'Play **A Minor** (A-C-E) for 4 beats.',
          'Play **F Major** (F-A-C) for 4 beats.',
          'Repeat! Can you hear the "Perfect" loop?'
        ]
      },
      {
        type: 'callout',
        icon: '🌟',
        title: 'Song Examples',
        text: 'This progression is used in "Let It Be", "Someone Like You", and "Kesariya"!'
      },
      {
        type: 'recap',
        items: [
          'Chord progressions are the "roadmap" of a song.',
          'C - G - Am - F is the most popular progression in the world.'
        ]
      }
    ],
    nextLessonId: 'hand-coordination'
  },
  'hand-coordination': {
    id: 'hand-coordination',
    title: 'Hand Coordination: Playing Together',
    goal: 'Learn how to play different things with your left and right hand simultaneously.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The "Separate to Together" Method'
      },
      {
        type: 'text',
        text: 'Trying to play both hands at once is the #1 struggle for beginners. The secret? **Don\'t start with both.**'
      },
      {
        type: 'steps',
        items: [
          '**Master the Right Hand:** Play your melody until you can do it without looking.',
          '**Master the Left Hand:** Play simple "Basenotes" (just the single note C, G, etc.)',
          '**Slow Down:** Like, REALLY slow. 20% speed.'
        ]
      },
      {
        type: 'practice',
        title: 'The "Simple Support" Exercise',
        steps: [
          'Left Hand: Play a low **C** and hold it.',
          'Right Hand: While holding that C, play the first part of "Mary Had a Little Lamb".',
          'Switch: Move Left Hand to **G** when the Right Hand melody reaches its high point.'
        ]
      },
      {
        type: 'mini-exercise',
        challenge: 'Try to tap your right hand in quarter notes (1-1-1-1) while your left hand taps only on beat 1. It sounds easy, but it takes focus!'
      },
      {
        type: 'recap',
        items: [
          'Always learn hands separately first.',
          'Left hand usually provides the "Anchor" (bass).',
          'Slow practice is the fastest way to progress.'
        ]
      }
    ],
    nextLessonId: 'natural-minor-scales'
  },
  'natural-minor-scales': {
    id: 'natural-minor-scales',
    title: 'The Natural Minor Scale',
    goal: 'Understand the "Sad" sound and the formula for Natural Minor scales.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The Formula'
      },
      {
        type: 'text',
        text: 'If Major is "Happy", Natural Minor is its "Sad" or "Serious" counterpart.'
      },
      {
        type: 'callout',
        icon: '🌙',
        title: 'The Formula',
        text: '**W - H - W - W - H - W - W**'
      },
      {
        type: 'heading',
        level: 2,
        text: 'A Minor: The Easiest Minor Scale'
      },
      {
        type: 'text',
        text: 'Just like C Major is all white keys starting on C, **A Minor** is all white keys starting on A.'
      },
      {
        type: 'practice',
        title: 'Play A Natural Minor',
        steps: [
          'Start on A (below Middle C).',
          'Play only white keys up to the next A.',
          'Notes: A - B - C - D - E - F - G - A.',
          'Notice how it sounds more emotional and moody than C Major.'
        ]
      },
      {
        type: 'recap',
        items: [
          'Natural Minor formula: W-H-W-W-H-W-W.',
          'A Minor is the "Relative Minor" of C Major (they share the same notes!).'
        ]
      }
    ],
    nextLessonId: 'harmonic-minor-scales'
  },
  'harmonic-minor-scales': {
    id: 'harmonic-minor-scales',
    title: 'The Harmonic Minor Scale',
    goal: 'Learn the exotic, "Egyptian" sound of the Harmonic Minor scale.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The Raised 7th'
      },
      {
        type: 'text',
        text: 'The Harmonic Minor scale is just like the Natural Minor, but we **raise the 7th note** by a half step.'
      },
      {
        type: 'callout',
        icon: '🐍',
        title: 'The Exotic Gap',
        text: 'Raising the 7th creates a large gap (3 half steps) between the 6th and 7th notes. This gives it that signature "Middle Eastern" or "Classical Villain" sound.'
      },
      {
        type: 'practice',
        title: 'A Harmonic Minor',
        steps: [
          'Start on A.',
          'Play A - B - C - D - E - F.',
          'Instead of G, play **G#** (the black key).',
          'Finish on A.',
          'Try playing it fast—notice the tension it creates!'
        ]
      },
      {
        type: 'recap',
        items: [
          'Harmonic Minor = Natural Minor + Raised 7th.',
          'Used heavily in Classical and Flamenco music.'
        ]
      }
    ],
    nextLessonId: 'melodic-minor-scales'
  },
  'melodic-minor-scales': {
    id: 'melodic-minor-scales',
    title: 'The Melodic Minor Scale',
    goal: 'Understand the most complex minor scale that changes as it goes up and down.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The "Split Personality" Scale'
      },
      {
        type: 'text',
        text: 'In classical music, the Melodic Minor scale is different depending on which way you are moving!'
      },
      {
        type: 'list',
        items: [
          '**Going Up:** Raise the 6th AND 7th notes.',
          '**Going Down:** Play it like a Natural Minor (all white keys for A).'
        ]
      },
      {
        type: 'practice',
        title: 'A Melodic Minor',
        steps: [
          '**UP:** A - B - C - D - E - **F#** - **G#** - A.',
          '**DOWN:** A - **G (natural)** - **F (natural)** - E - D - C - B - A.',
          'It sounds bright going up and dark going down.'
        ]
      },
      {
        type: 'recap',
        items: [
          'Melodic Minor: Raised 6th & 7th going up.',
          'Returns to Natural Minor going down.'
        ]
      }
    ],
    nextLessonId: 'pentatonic-blues-scales'
  },
  'pentatonic-blues-scales': {
    id: 'pentatonic-blues-scales',
    title: 'Pentatonic & Blues Scales',
    goal: 'The "Jammer\'s Secret": Learn the 5 and 6-note scales used in Rock, Jazz, and Pop.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The Pentatonic Scale'
      },
      {
        type: 'text',
        text: '"Penta" means 5. This scale removes the "clashy" notes (4th and 7th) to create a scale where every note sounds perfect.'
      },
      {
        type: 'practice',
        title: 'C Major Pentatonic',
        steps: [
          'Play: **C - D - E - G - A** (Skip F and B).',
          'Play these notes in any order—they will always sound good!',
          'Pro Tip: All the **Black Keys** on the piano form a Pentatonic scale.'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Blues Scale'
      },
      {
        type: 'text',
        text: 'Take the Minor Pentatonic and add the **"Blue Note"** (the flat 5th).'
      },
      {
        type: 'practice',
        title: 'A Blues Scale',
        steps: [
          'Notes: A - C - D - **D#** - E - G - A.',
          'That **D#** is the magic ingredient that makes it sound soulful.'
        ]
      },
      {
        type: 'recap',
        items: [
          'Pentatonic = 5 notes. Impossible to play a "wrong" note.',
          'Blues = Pentatonic + 1 "Blue" note.'
        ]
      }
    ],
    nextLessonId: 'scale-cheat-sheet'
  },
  'scale-cheat-sheet': {
    id: 'scale-cheat-sheet',
    title: 'Master Scale Cheat Sheet',
    goal: 'A quick-reference guide for every scale you\'ve learned.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The Formula Collection'
      },
      {
        type: 'table',
        headers: ['Scale Type', 'Formula (Steps)', 'Mood'],
        rows: [
          ['Major', 'W-W-H-W-W-W-H', 'Happy, Bright'],
          ['Natural Minor', 'W-H-W-W-H-W-W', 'Sad, Serious'],
          ['Harmonic Minor', 'W-H-W-W-H-A3-H', 'Exotic, Tense'],
          ['Melodic Minor', 'W-H-W-W-W-W-H (Up)', 'Classical, Elegant'],
          ['Major Pentatonic', 'W-W-m3-W-m3', 'Open, Friendly'],
          ['Minor Blues', 'm3-W-H-H-m3-W', 'Soulful, Cool']
        ]
      },
      {
        type: 'callout',
        icon: '🎓',
        title: 'Keep Going!',
        text: 'You\'re halfway through the course. Let\'s dive into the "Colors" of music: **Modes**.'
      }
    ],
    nextLessonId: 'intro-to-modes'
  },
  'intro-to-modes': {
    id: 'intro-to-modes',
    title: 'The 7 Modes of Music',
    goal: 'Understand the concept of "Modes" and how they change the mood of a scale.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'What are Modes?'
      },
      {
        type: 'text',
        text: 'Imagine the C Major scale (C-D-E-F-G-A-B). Now, imagine playing those **exact same notes**, but starting and ending on **D** instead of C. \n\nYou just played the **Dorian Mode**. It\'s the same "alphabet", but with a different "center".'
      },
      {
        type: 'table',
        headers: ['Mode', 'Starting Note (in C)', 'Vibe / Mood'],
        rows: [
          ['Ionian', 'C', 'Happy, Normal (Major)'],
          ['Dorian', 'D', 'Cool, Jazzy, Soulful'],
          ['Phrygian', 'E', 'Spanish, Dark, Mysterious'],
          ['Lydian', 'F', 'Dreamy, Spacey, Ethereal'],
          ['Mixolydian', 'G', 'Bluesy, Rock, Funky'],
          ['Aeolian', 'A', 'Sad, Serious (Minor)'],
          ['Locrian', 'B', 'Unstable, Dark, Strange']
        ]
      },
      {
        type: 'callout',
        icon: '🌈',
        title: 'Colors of Music',
        text: 'Think of modes like "filters" on a camera. They take the same scene and give it a completely different emotional color.'
      },
      {
        type: 'recap',
        items: [
          'Modes are scales derived from the Major scale.',
          'There are 7 distinct modes, each with a unique mood.',
          'They use the same notes but a different starting point.'
        ]
      }
    ],
    nextLessonId: 'dorian-phrygian-modes'
  },
  'dorian-phrygian-modes': {
    id: 'dorian-phrygian-modes',
    title: 'Dorian & Phrygian: The "Cool" & "Dark" Modes',
    goal: 'Master the first two minor-sounding modes.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Dorian (The Jazz Mode)'
      },
      {
        type: 'text',
        text: 'Dorian is like a Minor scale but with a **"Bright" 6th**. It sounds sophisticated and cool.'
      },
      {
        type: 'practice',
        title: 'Playing D Dorian',
        steps: [
          'Start on D.',
          'Play all white keys up to the next D.',
          'D - E - F - G - A - **B** - C - D.',
          'That B natural is the "Magic Note" that makes it Dorian!'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'Phrygian (The Spanish Mode)'
      },
      {
        type: 'text',
        text: 'Phrygian is a Minor scale with a **Flat 2nd**. It sounds incredibly dark and is used in Flamenco music.'
      },
      {
        type: 'practice',
        title: 'Playing E Phrygian',
        steps: [
          'Start on E.',
          'Play all white keys up to the next E.',
          'E - **F** - G - A - B - C - D - E.',
          'Notice how that F (the half step from E) creates instant tension!'
        ]
      },
      {
        type: 'recap',
        items: [
          'Dorian = Minor + Raised 6th.',
          'Phrygian = Minor + Flat 2nd.'
        ]
      }
    ],
    nextLessonId: 'lydian-mixolydian-modes'
  },
  'lydian-mixolydian-modes': {
    id: 'lydian-mixolydian-modes',
    title: 'Lydian & Mixolydian: The "Spacey" & "Bluesy" Modes',
    goal: 'Master the two major-sounding modes.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Lydian (The Dream Mode)'
      },
      {
        type: 'text',
        text: 'Lydian is like a Major scale but with a **Raised 4th**. It sounds like floating in space.'
      },
      {
        type: 'practice',
        title: 'Playing F Lydian',
        steps: [
          'Start on F.',
          'Play all white keys up to the next F.',
          'F - G - A - **B** - C - D - E - F.',
          'Used in movie soundtracks to create a sense of wonder.'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'Mixolydian (The Rock Mode)'
      },
      {
        type: 'text',
        text: 'Mixolydian is a Major scale with a **Flat 7th**. It’s the sound of classic rock and blues.'
      },
      {
        type: 'practice',
        title: 'Playing G Mixolydian',
        steps: [
          'Start on G.',
          'Play all white keys up to the next G.',
          'G - A - B - C - D - E - **F** - G.',
          'Notice how the F natural sounds "grittier" than the F# used in G Major.'
        ]
      },
      {
        type: 'recap',
        items: [
          'Lydian = Major + Raised 4th.',
          'Mixolydian = Major + Flat 7th.'
        ]
      }
    ],
    nextLessonId: 'chromatic-whole-tone'
  },
  'chromatic-whole-tone': {
    id: 'chromatic-whole-tone',
    title: 'Chromatic & Whole Tone Scales',
    goal: 'Explore scales that don\'t fit the standard "Major/Minor" pattern.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The Chromatic Scale'
      },
      {
        type: 'text',
        text: 'The Chromatic scale uses **every single key** on the piano. No gaps!'
      },
      {
        type: 'practice',
        title: 'The "Spider" Walk',
        steps: [
          'Play every white and black key from C to the next C.',
          'Formula: **H - H - H - H - H...**',
          'Use Finger 3 on black keys and Finger 1 on white keys (except when two white keys are together, use 1-2).'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Whole Tone Scale'
      },
      {
        type: 'text',
        text: 'This scale only uses **Whole Steps**. It has no "center" and sounds like a dream or a cartoon "blur" effect.'
      },
      {
        type: 'practice',
        title: 'The Dreamy Scale',
        steps: [
          'Start on C.',
          'Move by Whole Steps only: **C - D - E - F# - G# - A# - C**.',
          'Notice how it never sounds like it "arrives" at home.'
        ]
      },
      {
        type: 'recap',
        items: [
          'Chromatic = Every note.',
          'Whole Tone = Only whole steps (Sounds blurry/dreamy).'
        ]
      }
    ],
    nextLessonId: 'circle-of-fifths'
  },
  'circle-of-fifths': {
    id: 'circle-of-fifths',
    title: 'The Circle of Fifths: The Ultimate Cheat Sheet',
    goal: 'Learn how all keys are connected and how to master sharps and flats.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The Roadmap of Keys'
      },
      {
        type: 'text',
        text: 'The Circle of Fifths tells you how many sharps or flats are in every key. Moving "Clockwise" adds sharps. Moving "Counter-Clockwise" adds flats.'
      },
      {
        type: 'callout',
        icon: '⚙️',
        title: 'Sharp Order',
        text: '**F**at **C**ats **G**o **D**own **A**nd **E**at **B**irds (F-C-G-D-A-E-B)'
      },
      {
        type: 'table',
        headers: ['Key', 'Sharps/Flats', 'Notes'],
        rows: [
          ['C Major', 'None', 'All white keys'],
          ['G Major', '1 Sharp', 'F#'],
          ['D Major', '2 Sharps', 'F#, C#'],
          ['A Major', '3 Sharps', 'F#, C#, G#'],
          ['F Major', '1 Flat', 'Bb']
        ]
      },
      {
        type: 'mini-exercise',
        challenge: 'Try to name the sharps in E Major using the "Fat Cats" acronym! (Hint: It has 4 sharps).'
      },
      {
        type: 'recap',
        items: [
          'The Circle connects all 12 keys.',
          'It helps you transpose songs instantly.',
          'Mastering the order of sharps is a piano superpower.'
        ]
      }
    ],
    nextLessonId: 'pro-practice-tips'
  },
  'pro-practice-tips': {
    id: 'pro-practice-tips',
    title: 'Pro Practice Tips & Systems',
    goal: 'Learn how to practice like a professional to make 10x faster progress.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The "Rule of 3"'
      },
      {
        type: 'text',
        text: 'Never move on from a difficult part until you can play it **3 times in a row perfectly**. If you mess up on the 3rd time, you start back at 0!'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Mental Practice'
      },
      {
        type: 'text',
        text: 'You don\'t need a piano to practice. Close your eyes and "see" your fingers moving on the keys. Imagine the sound. This builds massive brain-hand connection.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Metronome is Your Best Friend'
      },
      {
        type: 'list',
        items: [
          '**Start Slow:** Find the speed where you are 100% comfortable.',
          '**Incremental Gains:** Only increase the speed by 2-3 BPM at a time.',
          '**Bursts:** Play 4 notes fast, then stop. This trains "fast twitch" muscles.'
        ]
      },
      {
        type: 'callout',
        icon: '🚀',
        title: 'Golden Rule',
        text: 'Quality > Quantity. 15 minutes of focused practice is better than 2 hours of "noodling" while watching TV.'
      },
      {
        type: 'recap',
        items: [
          'Use the Rule of 3.',
          'Practice mentally.',
          'Love your metronome.'
        ]
      }
    ],
    nextLessonId: 'scale-fingering-mastery'
  },
  'scale-fingering-mastery': {
    id: 'scale-fingering-mastery',
    title: 'Scale Fingering Mastery (All 12 Keys)',
    goal: 'Learn the universal fingering rules to play any major or minor scale across the keyboard.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The "Tuck & Cross" Technique'
      },
      {
        type: 'text',
        text: 'To play more than 5 notes, you need to "tuck" your thumb or "cross" your fingers.'
      },
      {
        type: 'callout',
        icon: '🖐️',
        title: 'Universal Rule (RH)',
        text: 'For most scales starting on white keys (C, G, D, A, E): \n**1 - 2 - 3 (Tuck) 1 - 2 - 3 - 4 - 5**.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The 12 Major Keys Fingering'
      },
      {
        type: 'table',
        headers: ['Key', 'Right Hand', 'Left Hand'],
        rows: [
          ['C, G, D, A, E Major', '1-2-3-tuck-1-2-3-4-5', '5-4-3-2-1-cross-3-2-1'],
          ['F Major', '1-2-3-4-tuck-1-2-3', '5-4-3-2-1-cross-3-2-1'],
          ['B Major', '1-2-3-tuck-1-2-3-4', '4-3-2-1-cross-4-3-2-1'],
          ['Bb Major', '2-1-2-3-tuck-1-2-3-4', '3-2-1-cross-4-3-2-1-cross-3']
        ]
      },
      {
        type: 'recap',
        items: [
          'The thumb (1) is your pivot point.',
          'Never use the thumb on a black key if you can avoid it.',
          'Consistency is more important than speed.'
        ]
      }
    ],
    nextLessonId: 'arpeggios-basics'
  },
  'arpeggios-basics': {
    id: 'arpeggios-basics',
    title: 'Arpeggios: The "Broken" Chords',
    goal: 'Learn how to play chords as flowing sequences of notes.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'What is an Arpeggio?'
      },
      {
        type: 'text',
        text: 'An arpeggio is a chord played one note at a time, usually spanning multiple octaves. It creates a "Harp-like" sound.'
      },
      {
        type: 'practice',
        title: 'C Major Arpeggio',
        steps: [
          'Notes: C - E - G - (High) C.',
          'Right Hand Fingering: **1 - 2 - 3 - 5**.',
          'Left Hand Fingering: **5 - 4 - 2 - 1**.',
          'Try playing it up and down smoothly without stopping.'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'The 3 Main Types'
      },
      {
        type: 'list',
        items: [
          '**Major Arpeggio:** (1-3-5) Bright and triumphant.',
          '**Minor Arpeggio:** (1-b3-5) Dark and dramatic.',
          '**Dominant 7th:** (1-3-5-b7) Bluesy and sophisticated.'
        ]
      },
      {
        type: 'recap',
        items: [
          'Arpeggios are the secret to fast, "shredding" piano runs.',
          'They use the same notes as chords but require thumb tucks for multi-octave runs.'
        ]
      }
    ],
    nextLessonId: 'bollywood-scale-secrets'
  },
  'bollywood-scale-secrets': {
    id: 'bollywood-scale-secrets',
    title: 'Bollywood Scale Secrets',
    goal: 'Learn the specific scales and modes used in famous Indian cinema songs.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The "Raag" Influence'
      },
      {
        type: 'text',
        text: 'Bollywood music is a mix of Western harmony and Indian Raags. Many hits use specific modes.'
      },
      {
        type: 'callout',
        icon: '🎬',
        title: 'Bhairavi Mood',
        text: 'Raag Bhairavi is almost identical to the **Phrygian Mode**. It\'s used in hundreds of sad or emotional Bollywood songs.'
      },
      {
        type: 'table',
        headers: ['Song Name', 'Scale/Mode Used', 'Mood'],
        rows: [
          ['Kesariya', 'C Major / Mixolydian', 'Romantic, Bright'],
          ['Tum Hi Ho', 'A Minor', 'Deeply Emotional'],
          ['Kal Ho Naa Ho', 'Major Scale', 'Grand, Uplifting'],
          ['Pasoori', 'Minor / Phrygian', 'Folk-Modern, Gritty']
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'The "Ornamentation" Secret'
      },
      {
        type: 'text',
        text: 'Bollywood piano isn\'t just about the notes; it\'s about the **"Meend"** (glides). On a piano, we simulate this with quick "grace notes" or "crushed notes".'
      },
      {
        type: 'practice',
        title: 'The Grace Note Flick',
        steps: [
          'Try to play E, but "flick" the D# just a millisecond before.',
          'This creates that signature Indian vocal-like ornament on the piano.'
        ]
      },
      {
        type: 'recap',
        items: [
          'Bollywood uses a lot of Mixolydian and Phrygian modes.',
          'Ornamentation (Grace notes) is key to the sound.',
          'Identify the "mood" to find the scale.'
        ]
      }
    ],
    nextLessonId: 'reading-music-101'
  },
  'reading-music-101': {
    id: 'reading-music-101',
    title: 'Reading Music 101: The Staff & Clefs',
    goal: 'Learn how to translate those lines and spaces into actual notes on the piano.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The Musical Staff'
      },
      {
        type: 'text',
        text: 'The staff has **5 lines** and **4 spaces**. Notes live on both!'
      },
      {
        type: 'callout',
        icon: '🎼',
        title: 'The Clefs',
        text: '**Treble Clef (𝄞):** Usually played with the Right Hand. \n**Bass Clef (𝄢):** Usually played with the Left Hand.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Mastering the Lines (Treble)'
      },
      {
        type: 'list',
        items: [
          '**Lines:** E - G - B - D - F (**E**very **G**ood **B**oy **D**oes **F**ine)',
          '**Spaces:** F - A - C - E (Spells the word **FACE**!)'
        ]
      },
      {
        type: 'recap',
        items: [
          'Treble = High notes, Bass = Low notes.',
          'Face spells the spaces.',
          'Every Good Boy Does Fine for the lines.'
        ]
      }
    ],
    nextLessonId: 'jazz-harmony-basics'
  },
  'jazz-harmony-basics': {
    id: 'jazz-harmony-basics',
    title: 'Jazz Harmony: Beyond the Triad',
    goal: 'Learn how to build 7th chords for that rich, professional jazz sound.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Adding the 7th'
      },
      {
        type: 'text',
        text: 'Jazz chords add a **4th note** to the triad. This 4th note is the 7th degree of the scale.'
      },
      {
        type: 'table',
        headers: ['Chord Name', 'Formula', 'Notes (in C)'],
        rows: [
          ['Major 7', '1 - 3 - 5 - 7', 'C - E - G - B'],
          ['Dominant 7', '1 - 3 - 5 - b7', 'C - E - G - Bb'],
          ['Minor 7', '1 - b3 - 5 - b7', 'C - Eb - G - Bb']
        ]
      },
      {
        type: 'practice',
        title: 'The "Dreamy" Major 7',
        steps: [
          'Play C - E - G - B all together.',
          'Notice how it sounds more "open" and less "finished" than a standard C Major.',
          'Try playing it with your right hand while your left hand plays a low C.'
        ]
      },
      {
        type: 'recap',
        items: [
          '7th chords have 4 notes.',
          'Major 7 = Dreamy, Dominant 7 = Bluesy, Minor 7 = Sophisticated.'
        ]
      }
    ],
    nextLessonId: 'art-of-transposition'
  },
  'art-of-transposition': {
    id: 'art-of-transposition',
    title: 'The Art of Transposition',
    goal: 'Learn how to move a song from one key to another instantly.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'Why Transpose?'
      },
      {
        type: 'text',
        text: 'Sometimes a song is too high or too low for a singer. Transposition allows you to move the entire song to a more comfortable key.'
      },
      {
        type: 'callout',
        icon: '🔄',
        title: 'The Secret',
        text: 'Don\'t think of notes (C, D, E). Think of **Numbers** (1, 2, 3).'
      },
      {
        type: 'steps',
        items: [
          'Find the numbers of the original melody (e.g., 3-2-1).',
          'Pick a new key (e.g., G Major).',
          'Play those same numbers in the new key (B - A - G).'
        ]
      },
      {
        type: 'practice',
        title: 'Transposing "Mary Had a Little Lamb"',
        steps: [
          'Original (C Major): E - D - C (3-2-1).',
          'New Key (G Major): B - A - G (3-2-1).',
          'It\'s the same song, just higher!'
        ]
      },
      {
        type: 'recap',
        items: [
          'Numbers are universal across all keys.',
          'Transposition is just shifting the "Starting Point" of your numbers.'
        ]
      }
    ],
    nextLessonId: 'ear-training-basics'
  },
  'ear-training-basics': {
    id: 'ear-training-basics',
    title: 'Ear Training: Recognizing Intervals',
    goal: 'Learn how to identify the distance between notes by ear.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The "Song Association" Method'
      },
      {
        type: 'text',
        text: 'The easiest way to recognize intervals is to associate them with the first two notes of a famous song.'
      },
      {
        type: 'table',
        headers: ['Interval', 'Name', 'Song Reference'],
        rows: [
          ['Major 2nd', 'C to D', 'Happy Birthday'],
          ['Major 3rd', 'C to E', 'When the Saints Go Marching In'],
          ['Perfect 4th', 'C to F', 'Here Comes the Bride'],
          ['Perfect 5th', 'C to G', 'Twinkle Twinkle Little Star / Star Wars'],
          ['Octave', 'C to (High) C', 'Somewhere Over the Rainbow']
        ]
      },
      {
        type: 'practice',
        title: 'The Blind Test',
        steps: [
          'Close your eyes.',
          'Play two notes on the piano.',
          'Try to hum the "reference song" to see if it fits the distance.',
          'Repeat until you can identify a Perfect 5th instantly!'
        ]
      },
      {
        type: 'recap',
        items: [
          'Intervals are the distance between notes.',
          'Ear training is like learning a new language.',
          'Use songs as your guide.'
        ]
      }
    ],
    nextLessonId: 'songwriting-basics'
  },
  'songwriting-basics': {
    id: 'songwriting-basics',
    title: 'Songwriting Basics: Creating Your Own Hits',
    goal: 'Learn the simple structure used to write your own songs.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The 3-Layer Method'
      },
      {
        type: 'text',
        text: 'Most pop and Bollywood songs are built in 3 layers:'
      },
      {
        type: 'steps',
        items: [
          '**Layer 1: The Chord Progression:** Pick a loop (like C-G-Am-F).',
          '**Layer 2: The Rhythm:** Decide on a steady beat or pattern.',
          '**Layer 3: The Melody:** Hum notes from the scale until you find a "Hook" that sticks.'
        ]
      },
      {
        type: 'callout',
        icon: '✍️',
        title: 'Structure',
        text: '**Verse:** Sets the story. \n**Chorus:** The catchy, high-energy part everyone remembers.'
      },
      {
        type: 'practice',
        title: 'Write Your First Loop',
        steps: [
          'Play Am - F - C - G on a loop.',
          'Try to hum a "sad" verse melody, then a "happy" chorus melody over it.',
          'Congratulations—you are now a songwriter!'
        ]
      },
      {
        type: 'recap',
        items: [
          'Chords provide the foundation.',
          'Melody provides the hook.',
          'Keep it simple!'
        ]
      }
    ],
    nextLessonId: 'basic-improvisation'
  },
  'basic-improvisation': {
    id: 'basic-improvisation',
    title: 'Intro to Improvisation',
    goal: 'Learn how to "noodle" and create your own melodies without any sheet music.',
    content: [
      {
        type: 'heading',
        level: 2,
        text: 'The "Safety Net" Strategy'
      },
      {
        type: 'text',
        text: 'Improvisation isn\'t random. It\'s about playing within a set of "Safe" notes.'
      },
      {
        type: 'callout',
        icon: '🎭',
        title: 'Your Playground',
        text: 'For this lesson, your playground is the **C Major Scale** (all white keys). Any white key will sound okay!'
      },
      {
        type: 'heading',
        level: 2,
        text: 'How to Start'
      },
      {
        type: 'list',
        items: [
          '**Question & Answer:** Play a short phrase that sounds like a question, then play a response.',
          '**Repeat Patterns:** Don\'t play new things all the time. Repeat a 3-note pattern twice, then change one note.',
          '**Use Rhythm:** Even playing just ONE note (C) with an interesting rhythm is better than playing random notes with no rhythm.'
        ]
      },
      {
        type: 'practice',
        title: 'Your First Jam Session',
        steps: [
          'Left Hand: Play a C Major triad and let it ring.',
          'Right Hand: Explore the white keys between Middle C and High C.',
          'Try to "land" on C, E, or G at the end of your phrases. These are the "Home" notes.'
        ]
      },
      {
        type: 'recap',
        items: [
          'Improv is just "composing in the moment".',
          'Stick to one scale to stay "safe".',
          'Repetition is your best friend.'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: '🎉 The Ultimate Piano Journey Complete!'
      },
      {
        type: 'text',
        text: 'You have completed all 10 modules. You have the tools to play, improvise, and write music. The world of piano is now yours to explore. \n\n**Keep practicing, keep playing, and keep making music!**'
      }
    ]
  }
};
