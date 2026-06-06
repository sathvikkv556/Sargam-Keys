import Link from 'next/link';
import { Music, Mail, Play } from 'lucide-react';

/**
 * Footer component with links and copyright
 */
export function Footer() {
  const footerLinks = [
    {
      title: 'Resources',
      links: [
        { label: 'All Notes', href: '/notes' },
        { label: 'Music Theory', href: '/music-theory' },
        { label: 'Categories', href: '/categories' },
        { label: 'Submit Notes', href: '/notes/new' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Search', href: '/search' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms & Conditions', href: '/terms' },
        { label: 'Disclaimer', href: '/disclaimer' },
        { label: 'DMCA Policy', href: '/dmca' },
      ],
    },
  ];

  return (
    <footer className="border-t border-slate-200 bg-slate-50 dark:border-white/5 dark:bg-slate-950 transition-colors" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">Footer</h2>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-2">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-2 group" aria-label="SargamKeys Home">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg group-hover:scale-110 transition-transform">
                <Music className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black tracking-tighter">SargamKeys</span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 font-medium leading-relaxed text-sm">
              Master the piano with a world-class collection of free piano notes and practical music theory lessons. Perfect for beginners and enthusiasts.
            </p>
            <div className="flex items-center gap-4">
               <a 
                href="https://www.youtube.com/@Sathvik_Keys" 
                target="_blank" 
                rel="noopener noreferrer"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/5 hover:bg-red-600 hover:text-white transition-all"
                aria-label="YouTube Channel"
               >
                 <Play className="h-5 w-5" />
               </a>
               <a 
                href="mailto:ksathvik485@gmail.com"
                className="h-10 w-10 flex items-center justify-center rounded-full bg-slate-200 dark:bg-white/5 hover:bg-blue-600 hover:text-white transition-all"
                aria-label="Email Contact"
               >
                 <Mail className="h-5 w-5" />
               </a>
            </div>
          </div>

          {/* Link Columns */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-bold transition-colors flex items-center gap-2 group"
                    >
                      <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 group-hover:bg-blue-600 dark:group-hover:bg-blue-400 transition-all" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-xs font-medium text-slate-500">
            &copy; 2026 SargamKeys. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
