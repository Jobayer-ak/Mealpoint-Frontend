'use client';

import { Home, LogOut, Settings, ShoppingCart } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { IoCloseOutline, IoMoonOutline } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { RiMenu2Line } from 'react-icons/ri';
import HorizontalLine from '../../../components/Shared/featuresIcons/HorizontalLine';
import { ScrollArea } from '../../../components/ui/scroll-area';
import { cn } from '../../../lib/utils';
import { useAppSelector } from '../../../redux/hook/hook';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false); // responsive sidebar
  const { profile } = useAppSelector((state) => state.user);

  // Load saved theme
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
        'dashboard dashboard-transition flex min-h-screen flex-col md:flex-row',
        darkMode && 'dark'
      )}
    >
      {/* 🔹 Sidebar background blur overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed top-16 inset-0 z-30 bg-black/30 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 🔹 Sidebar */}
      <aside
        className={cn(
          'fixed md:static top-16 left-0 z-40 min-h-screen w-64 p-4 flex flex-col border-r border-[#e5e9f0] dashboard-border transform transition-transform duration-300',
          // Sidebar background colors for light/dark mode
          darkMode
            ? 'bg-[#101828] text-[--dashboard-dark-text]'
            : 'bg-white text-[--dashboard-light-text]',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
      >
        <ScrollArea className="flex-1 h-auto">
          <nav className="flex flex-col space-y-2">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} className="w-full">
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'sidebar-btn cursor-pointer flex items-center gap-2 px-4 py-2 rounded transition-colors duration-300',
                      isActive && 'active'
                    )}
                  >
                    <Icon size={18} />
                    {label}
                  </button>
                </Link>
              );
            })}
          </nav>

          <div className="mt-10">
            <HorizontalLine />
          </div>
          <button className="sidebar-btn logout mt-4 w-full flex items-center gap-2 bg-[--sidebar-btn-logout-bg] hover:bg-[--sidebar-btn-logout-hover] text-white p-2 rounded transition-colors duration-300">
            <LogOut size={18} />
            Logout
          </button>
        </ScrollArea>
      </aside>

      {/* 🔹 Main area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 md:h-20 px-4 md:px-6 flex items-center justify-between border-[#e5e9f0] dashboard-border bg-[--dashboard-light-bg] dark:bg-[--dashboard-dark-bg] text-[--dashboard-light-text] dark:text-[--dashboard-dark-text] dashboard-transition sticky top-0 z-20">
          <div className="flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-[--dashboard-light-text] dark:text-[--dashboard-dark-text]"
              onClick={() => setSidebarOpen(!sidebarOpen)} // toggle sidebar open/close
            >
              {sidebarOpen ? (
                <IoCloseOutline size={26} />
              ) : (
                <RiMenu2Line size={26} />
              )}
            </button>

            <h1 className="text-lg md:text-xl font-semibold">
              {links.find((link) => pathname === link.href)?.label ||
                'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-4 py-6">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="sidebar-btn toggle flex items-center justify-center text-[--toggle-btn-text] bg-[--toggle-btn-bg] hover:bg-[--toggle-btn-hover] transition-all duration-300 cursor-pointer w-10 h-10 md:w-12 md:h-12 rounded-full"
            >
              {darkMode ? (
                <LuSun style={{ width: 26, height: 26 }} />
              ) : (
                <IoMoonOutline style={{ width: 26, height: 26 }} />
              )}
            </button>

            {/* Profile */}
            {profile?.profileImage ? (
              <div className="w-15 h-15 relative rounded-full overflow-hidden">
                <Image
                  src={profile.profileImage}
                  alt={profile?.name || 'profile'}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-15 h-15 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold">
                {profile?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
            )}
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-6 bg-[--dashboard-light-bg] dark:bg-[--dashboard-dark-bg] text-[--dashboard-light-text] dark:text-[--dashboard-dark-text] dashboard-transition overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
