'use client';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Home, LogOut, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const links = [
    { href: '/dashboard', label: 'Overview', icon: Home },
    { href: '/dashboard/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-screen bg-whtie">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/30 p-4 flex flex-col">
        <h2 className="text-xl font-semibold mb-6">Dashboard</h2>

        <ScrollArea className="flex-1">
          <nav className="space-y-1">
            {links.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <Button
                  variant={pathname === href ? 'default' : 'ghost'}
                  className={cn(
                    'w-full justify-start gap-2',
                    pathname === href && 'bg-primary text-primary-foreground'
                  )}
                >
                  <Icon size={18} />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <Button variant="destructive" className="mt-auto gap-2">
          <LogOut size={18} />
          Logout
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
