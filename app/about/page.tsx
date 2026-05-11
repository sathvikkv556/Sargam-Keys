import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About SargamKeys | Our Mission & Story',
  description: 'Learn about SargamKeys, our mission to make piano learning accessible, and the technology behind our platform.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
          About SargamKeys
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Learn the story behind our piano learning platform
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Mission */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Our Mission
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            SargamKeys is dedicated to making piano music theory accessible to everyone. We believe that learning piano notes, scales, and music theory should be simple, structured, and enjoyable. Our mission is to provide comprehensive resources that help musicians at all levels master the fundamentals of piano and music theory.
          </p>
        </section>

        {/* What We Offer */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            What We Offer
          </h2>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li className="flex gap-3">
              <span className="text-2xl">🎵</span>
              <span>Comprehensive piano notes and scales documentation</span>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">🎼</span>
              <span>Detailed chord progressions and voicing guides</span>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">📚</span>
              <span>In-depth music theory explanations</span>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">🎹</span>
              <span>Progressive learning paths for all skill levels</span>
            </li>
            <li className="flex gap-3">
              <span className="text-2xl">🌙</span>
              <span>Beautiful dark mode for comfortable learning</span>
            </li>
          </ul>
        </section>

        {/* Features */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Key Features
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              {
                title: 'Organized Categories',
                description: 'Content organized by scales, chords, progressions, techniques, and music theory',
              },
              {
                title: 'Difficulty Levels',
                description: 'Resources tailored for beginners, intermediate, and advanced musicians',
              },
              {
                title: 'Responsive Design',
                description: 'Access learning materials on any device, anytime, anywhere',
              },
              {
                title: 'Dark Mode Support',
                description: 'Comfortable learning experience with automatic theme detection',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-800"
              >
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Technology */}
        <section>
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Built With Modern Technology
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            SargamKeys is built using cutting-edge web technologies:
          </p>
          <ul className="grid gap-3 text-gray-700 dark:text-gray-300 sm:grid-cols-2">
            <li className="flex gap-2">
              <span>✓</span>
              <span>Next.js 15 with App Router</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>TypeScript for type safety</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>TailwindCSS for styling</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>MongoDB with Mongoose</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Dark mode with next-themes</span>
            </li>
            <li className="flex gap-2">
              <span>✓</span>
              <span>Optimized for SEO</span>
            </li>
          </ul>
        </section>

        {/* Contact */}
        <section className="rounded-lg bg-blue-50 p-8 dark:bg-blue-900">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="mb-6 text-gray-700 dark:text-gray-300">
            Have questions, suggestions, or want to contribute? We&apos;d love to hear from you!
          </p>
          <a
            href="mailto:contact@sargamkeys.com"
            className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Contact Us
          </a>
        </section>
      </div>
    </div>
  );
}
