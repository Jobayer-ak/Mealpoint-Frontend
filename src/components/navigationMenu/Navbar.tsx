'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';
import { useAppSelector } from '../../redux/hook/hook';

// Guest links (not logged in)
const GUEST_LINKS = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Menu', href: '/menu' },
  { title: 'Reservation', href: '/reservation' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
  { title: 'Shop', href: '/shop' },
  { title: 'Login', href: '/auth/login' },
];

// Authenticated user links
const AUTH_LINKS = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Menu', href: '/menu' },
  { title: 'Reservation', href: '/reservation' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
  { title: 'Shop', href: '/shop' },
  { title: 'Logout', href: '/auth/logout' }, // will handle click
];

interface NavLinkProps {
  href: string;
  title: string;
  onClick?: () => void;
  className?: string;
}

const NavLink = ({ href, title, onClick, className }: NavLinkProps) => (
  <Link
    href={href}
    onClick={onClick}
    className={`text-lg font-medium transition-colors hover:text-yellow-500 ${className}`}
  >
    {title}
  </Link>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: session } = useSession();

  const profile = useAppSelector((state) => state.user?.profile);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Choose links based on session
  const links = session?.user ? AUTH_LINKS : GUEST_LINKS;
  console.log('session: ', session?.user);

  console.log('Profile: ', profile ?? 'No profile found');

  return (
    <header className="bg-white shadow-md rounded-2xl my-4 relative z-50">
      <nav className="container mx-auto flex items-center justify-between h-[80px] px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#183136]">
          Meal Point
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center space-x-8">
          {links.map((link) =>
            link.title === 'Logout' ? (
              <li
                key={link.title}
                onClick={() => signOut({ callbackUrl: '/' })}
                className="cursor-pointer text-lg text-[#183136]"
              >
                {link.title}
              </li>
            ) : (
              <li key={link.href}>
                <NavLink
                  href={link.href}
                  title={link.title}
                  className="text-[#183136]"
                />
              </li>
            )
          )}
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="hidden lg:block bg-[#f29e38] text-[#183136] text-lg tracking-wider px-6 py-2 rounded-full hover:bg-yellow-600 transition cursor-pointer">
            Reservation
          </button>

          <button className="text-gray-600 hover:text-yellow-500">
            <MdOutlineShoppingCart size={24} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-[#183136]"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <RxCross1 size={24} /> : <CiMenuFries size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t absolute top-full left-0 w-full shadow-md">
          <div className="flex flex-col space-y-4 p-4">
            {links.map((link) =>
              link.title === 'Logout' ? (
                <button
                  key={link.title}
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setIsMenuOpen(false);
                  }}
                  className="bg-[#f29e38] text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition"
                >
                  {link.title}
                </button>
              ) : (
                <NavLink
                  key={link.href}
                  href={link.href}
                  title={link.title}
                  className="text-[#183136]"
                  onClick={() => setIsMenuOpen(false)}
                />
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
