'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { IoCloseOutline, IoHomeOutline, IoMoonOutline } from 'react-icons/io5';
import { LuLogOut, LuSun } from 'react-icons/lu';
import { PiGearSix, PiShoppingCart } from 'react-icons/pi';
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
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile sidebar
  const [collapsed, setCollapsed] = useState(false); // large screen collapse
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
    { href: '/dashboard', label: 'Overview', icon: IoHomeOutline },
    { href: '/dashboard/cart', label: 'Cart', icon: PiShoppingCart },
    { href: '/dashboard/settings', label: 'Settings', icon: PiGearSix },
  ];

  return (
    <div
      className={cn(
        'dashboard dashboard-transition flex min-h-screen flex-col md:flex-row',
        darkMode && 'dark'
      )}
    >
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed top-20 inset-0 z-30 bg-black/30 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed lg:static top-20 left-0 z-40 min-h-screen p-4 flex flex-col dashboard-border transform transition-all duration-300',
          darkMode
            ? 'bg-[#101828] text-[--dashboard-dark-text]'
            : 'bg-white text-[--dashboard-light-text]',
          sidebarOpen
            ? 'translate-x-0 w-64'
            : '-translate-x-full lg:translate-x-0 w-64',
          collapsed && 'lg:w-24' // collapsed sidebar on large screens
        )}
      >
        <ScrollArea className="flex-1 h-auto">
          {/* Logo / Title */}
          <div className="flex justify-between items-center pb-0 lg:pb-7">
            {!collapsed ? (
              <h1 className="text-2xl font-bold hidden lg:block">Meal Point</h1>
            ) : (
              <h1 className="text-2xl font-bold hidden lg:block">MP</h1>
            )}
          </div>

          <div className="mb-4 hidden lg:block">
            <HorizontalLine />
          </div>

          {/* Navigation */}
          <nav className="flex flex-col space-y-2">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href} className="w-full">
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'sidebar-btn cursor-pointer flex items-center gap-3 px-4 py-2 rounded transition-colors duration-300 w-full text-left',
                      isActive && 'active'
                      // collapsed && 'justify-center'
                    )}
                  >
                    <Icon size={24} />
                    {!collapsed && <span>{label}</span>}
                  </button>
                </Link>
              );
            })}
          </nav>

          <div className="mt-10">{<HorizontalLine />}</div>

          <button
            className={cn(
              'sidebar-btn logout mt-4 flex items-center gap-2 bg-[--sidebar-btn-logout-bg] hover:bg-[--sidebar-btn-logout-hover] text-[--sidebar-btn--text] p-2 rounded transition-colors duration-300'
              // collapsed ? 'justify-center' : 'w-full'
            )}
          >
            <LuLogOut size={24} />
            {!collapsed && 'Logout'}
          </button>
        </ScrollArea>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-20 px-4 md:px-6 flex items-center justify-between dashboard-border-bottom bg-[--dashboard-light-bg] dark:bg-[--dashboard-dark-bg] text-[--dashboard-light-text] dark:text-[--dashboard-dark-text] dashboard-transition sticky top-0 z-20">
          <div className="flex items-center gap-4">
            {/* Burger menu for all screens */}
            <button
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setSidebarOpen(!sidebarOpen);
                } else {
                  setCollapsed(!collapsed);
                }
              }}
              className="text-[--dashboard-light-text] dark:text-[--dashboard-dark-text] dashboard-border p-2 rounded-sm cursor-pointer"
            >
              {sidebarOpen ? (
                <IoCloseOutline size={32} />
              ) : (
                <RiMenu2Line size={32} />
              )}
            </button>

            {/* Brand for mobile */}
            <h1 className="text-2xl font-bold block lg:hidden">Meal Point</h1>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="sidebar-btn toggle dashboard-border flex items-center justify-center text-[--toggle-btn-text] bg-[--toggle-btn-bg] hover:bg-[--toggle-btn-hover] transition-all duration-300 cursor-pointer w-10 h-10 md:w-12 md:h-12"
            >
              {darkMode ? (
                <LuSun style={{ width: 26, height: 26 }} />
              ) : (
                <IoMoonOutline style={{ width: 26, height: 26 }} />
              )}
            </button>

            {/* Profile */}
            {profile?.profileImage ? (
              <div className="w-14 h-14 relative rounded-full overflow-hidden">
                <Image
                  src={profile.profileImage}
                  alt={profile?.name || 'profile'}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold">
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
