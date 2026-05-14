import { ReactNode } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  Music, 
  Grid, 
  Users, 
  BarChart3, 
  Settings,
  LogOut,
  PlusCircle,
  Home,
  Menu,
  MessageSquare
} from 'lucide-react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Overview', href: '/admin' },
  { icon: Music, label: 'Song Library', href: '/admin/songs' },
  { icon: PlusCircle, label: 'Add New Song', href: '/admin/songs/new' },
  { icon: Grid, label: 'Categories', href: '/admin/categories' },
  { icon: MessageSquare, label: 'Comments', href: '/admin/comments' },
  { icon: BarChart3, label: 'Analytics', href: '/admin/analytics' },
  { icon: Users, label: 'Team', href: '/admin/users' },
  { icon: Settings, label: 'Site Settings', href: '/admin/settings' },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Strictly block admin access in production
  if (process.env.NODE_ENV === 'production') {
    redirect('/');
  }

  const session = await getServerSession(authOptions);

  if (!session || (session.user as any).role !== 'admin') {
    redirect('/auth/signin?callbackUrl=/admin');
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 h-screen w-64 border-r bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="flex h-16 items-center border-b px-6 dark:border-slate-800">
          <Link href="/" className="flex items-center gap-3 group transition-all duration-300">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg shadow-blue-500/20 group-hover:shadow-blue-500/40 transition-all">
              <img 
                src="/logo.jpg" 
                alt="SargamKeys Logo" 
                className="h-full w-full object-cover"
              />
            </div>
            <span className="font-playfair text-lg font-black tracking-tight text-slate-900 dark:text-white leading-none">
              SARGAMKEYS
            </span>
          </Link>
        </div>
        <div className="flex flex-col justify-between h-[calc(100vh-64px)] p-4">
          <nav className="space-y-1">
            <div className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
              Main Menu
            </div>
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
          
          <div className="space-y-1 border-t pt-4 dark:border-slate-800">
            <Link
              href="/"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-50"
            >
              <Home className="h-4 w-4" />
              Public Website
            </Link>
            <Link
              href="/api/auth/signout"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="ml-64 flex-1">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-white/80 px-8 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex flex-1 items-center justify-between">
            <div className="text-sm font-medium text-slate-500">
              Logged in as: <span className="text-slate-900 dark:text-slate-100">{session.user?.email}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                {session.user?.name?.charAt(0) || 'A'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <div className="mx-auto max-w-5xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
