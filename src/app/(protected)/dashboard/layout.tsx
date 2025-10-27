'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';
import { CiLogout } from 'react-icons/ci';
import { FaRegCircleUser } from 'react-icons/fa6';
import { IoCloseOutline, IoHomeOutline, IoMoonOutline } from 'react-icons/io5';
import { LuSun } from 'react-icons/lu';
import { PiGearSix, PiShoppingCart } from 'react-icons/pi';
import { RiMenu2Line } from 'react-icons/ri';
import HorizontalLine from '../../../components/Shared/featuresIcons/HorizontalLine';
import { cn } from '../../../lib/utils';
import { useAppSelector } from '../../../redux/hook/hook';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { profile } = useAppSelector((state) => state?.user);

  // Load dark mode from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('dashboard-dark');
    if (saved === 'true') setDarkMode(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('dashboard-dark', darkMode.toString());
  }, [darkMode]);

  const links = [
    { href: '/dashboard', label: 'Overview', icon: IoHomeOutline },
    {
      href: '/dashboard/user-profile',
      label: 'User Profile',
      icon: FaRegCircleUser,
    },
    { href: '/dashboard/orders', label: 'Orders', icon: PiShoppingCart },
    { href: '/dashboard/settings', label: 'Settings', icon: PiGearSix },
  ];

  return (
    <div
      className={cn(
        'flex min-h-screen w-full transition-colors duration-300',
        darkMode && 'dark'
      )}
    >
      {/*  Sidebar  */}
      <aside
        className={cn(
          'fixed top-8 lg:top-0 left-0 z-40 flex h-screen flex-col p-4 border-r dashboard-border transition-all duration-300 pb-15',
          darkMode ? 'bg-[#101828]' : 'bg-white',
          darkMode
            ? 'text-[var(--dashboard-dark-text)]'
            : 'text-[var(--dashboard-light-text)]',
          sidebarOpen
            ? 'translate-x-0 w-64'
            : '-translate-x-full lg:translate-x-0 w-64',
          collapsed && 'lg:w-24'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between mb-7">
            <h1 className="text-2xl font-bold text-center hidden lg:block">
              MP
            </h1>
          </div>

          {!sidebarOpen && <HorizontalLine />}

          {/* Navigation */}
          <nav className="flex flex-col flex-1 space-y-2 overflow-x-hidden mt-5">
            {links.map(({ href, label, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link key={href} href={href}>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      'sidebar-btn flex items-center px-4 py-2 rounded transition-all duration-300 w-full cursor-pointer text-left overflow-hidden',
                      isActive && 'active'
                    )}
                  >
                    <div className="min-w-[24px] flex justify-center">
                      <Icon size={22} />
                    </div>
                    <span
                      className={cn(
                        'ml-3 whitespace-nowrap transition-all duration-300',
                        collapsed
                          ? 'opacity-0 w-0 overflow-hidden'
                          : 'opacity-100 w-auto'
                      )}
                    >
                      {label}
                    </span>
                  </button>
                </Link>
              );
            })}
          </nav>

          {!sidebarOpen && <HorizontalLine />}

          {/* Logout */}
          <button className="flex items-center gap-2 mt-4 p-2 rounded-md bg-red-500/10 hover:bg-red-500/20 text-red-500 transition-colors duration-300">
            <CiLogout size={22} />
            {!collapsed && 'Logout'}
          </button>
        </div>
      </aside>

      {/* Main Section  */}
      <div
        className={cn(
          'flex flex-col flex-1 min-h-screen transition-all duration-300',
          collapsed ? 'lg:ml-24' : 'lg:ml-64'
        )}
      >
        {/*  Header (Sticky)  */}
        <header
          className={cn(
            'sticky top-0 z-50 flex items-center justify-between h-20 px-4 py-6 md:px-6 dashboard-border-bottom backdrop-blur-md transition-all duration-300',
            darkMode ? 'bg-[#101828]' : 'bg-white'
          )}
        >
          <div className="flex items-center gap-4">
            {/* Sidebar toggle */}
            <button
              onClick={() => {
                if (window.innerWidth < 1024) setSidebarOpen(!sidebarOpen);
                else setCollapsed(!collapsed);
              }}
              className="p-2 rounded-md dashboard-border cursor-pointer"
            >
              {sidebarOpen ? (
                <IoCloseOutline size={28} className="text-gray-500" />
              ) : (
                <RiMenu2Line size={28} className="text-gray-500" />
              )}
            </button>

            <h1 className="text-2xl d-text-color font-bold block lg:hidden">
              Meal Point
            </h1>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 dashboard-border rounded-full cursor-pointer"
            >
              {darkMode ? (
                <LuSun className="text-yellow-400" size={22} />
              ) : (
                <IoMoonOutline className="text-gray-600" size={22} />
              )}
            </button>

            {/* Profile */}
            {profile?.profileImage ? (
              <div className="w-14 h-14 relative dashboard-border rounded-full overflow-hidden">
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

        {/*  Scrollable Content  */}
        <main
          className={cn(
            'flex-1 w-full h-[calc(100vh-5rem)] overflow-y-auto transition-colors duration-300 p-4 md:p-6',
            darkMode ? 'bg-[#101828]' : 'bg-[#f9fbfc]'
          )}
        >
          {children}
        </main>
      </div>

      {/*  Mobile Overlay  */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}
