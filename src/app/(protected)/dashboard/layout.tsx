'use client';

import { Home, LogOut, Moon, Settings, ShoppingCart, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { cn } from '../../../lib/utils';
import { useAppSelector } from '../../../redux/hook/hook';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const { profile } = useAppSelector((state) => state.user);

  // Load saved dashboard theme
  useEffect(() => {
    const saved = localStorage.getItem('dashboard-dark');
    if (saved === 'true') setDarkMode(true);
  }, []);

  // Save theme
  useEffect(() => {
    localStorage.setItem('dashboard-dark', darkMode.toString());
  }, [darkMode]);

  const links = [
    { href: '/dashboard', label: 'Overview', icon: Home },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
    { href: '/dashboard/cart', label: 'Cart', icon: ShoppingCart },
  ];

  return (
    <div
      className={cn(
        'dashboard dashboard-transition flex min-h-screen',
        darkMode && 'dark'
      )}
    >
      {/* Sidebar */}
      <aside className="w-64 p-4 flex flex-col dashboard-transition shadow-xs dark:shadow-lg ">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

        <ScrollArea className="flex-1">
          <nav className="space-y-2 flex flex-col">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} className="w-full">
                  <button
                    className={cn(
                      'sidebar-btn w-full flex items-center gap-2 px-4 py-2 rounded transition-colors',
                      isActive
                        ? 'bg-[--sidebar-btn-active] text-[--sidebar-btn-text]'
                        : 'bg-[--sidebar-btn-bg] text-[--sidebar-btn-text] hover:bg-[--sidebar-btn-hover]'
                    )}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                </Link>
              );
            })}
          </nav>
        </ScrollArea>

        <button className="sidebar-btn logout mt-auto gap-2 flex items-center bg-[--sidebar-btn-logout-bg] hover:bg-[--sidebar-btn-logout-hover] text-white">
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <header className="h-20 px-6 shadow-sm flex items-center justify-between bg-[--dashboard-light-bg] dark:bg-[--dashboard-dark-bg] text-[--dashboard-light-text] dark:text-[--dashboard-dark-text] dashboard-transition">
          <h1 className="text-xl font-semibold">
            {links.find((link) => pathname === link.href)?.label || 'Dashboard'}
          </h1>

          {/* Right-side controls */}
          <div className="flex items-center gap-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-1 rounded flex items-center justify-center text-[--sidebar-btn-text] hover:bg-[--sidebar-btn-hover] transition"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>

            {/* Profile avatar */}
            {profile?.profileImage ? (
              <div className="w-15 h-15 relative rounded-full overflow-hidden">
                <Image
                  src={profile.profileImage}
                  alt={profile?.name || 'profile?'}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-30 h-15 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold">
                {profile?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 bg-[--dashboard-light-bg] dark:bg-[--dashboard-dark-bg] text-[--dashboard-light-text] dark:text-[--dashboard-dark-text] dashboard-transition overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
