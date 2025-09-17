'use client';

import Link from 'next/link';
import { useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';

// Centralized navigation links
const NAV_LINKS = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Menu', href: '/menu' },
  { title: 'Reservation', href: '/reservation' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contact', href: '/contact' },
  { title: 'Shop', href: '/shop' },
  { title: 'Login', href: '/login' },
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

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="bg-white shadow-md rounded-2xl my-4 relative z-50">
      <nav className="container mx-auto flex items-center justify-between h-[80px] px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-gray-800">
          Meal Point
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                title={link.title}
                className="text-gray-900"
              />
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <button className="hidden lg:block bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition">
            Reservation
          </button>

          <button className="text-gray-600 hover:text-yellow-500">
            <MdOutlineShoppingCart size={24} />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-gray-800"
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
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                title={link.title}
                className="text-gray-700"
                onClick={() => setIsMenuOpen(false)}
              />
            ))}

            <button className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition">
              Reservation
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
