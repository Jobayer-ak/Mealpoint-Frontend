/* eslint-disable react/jsx-key */
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { RxCross1 } from 'react-icons/rx';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Menu', href: '/menu' },
    { title: 'Reservation', href: '/reservation' },
    { title: 'Blog', href: '/blog' },
    { title: 'Contact', href: '/contact' },
    { title: 'Login', href: '/login' },
  ];

  return (
    <nav className="bg-white shadow-md rounded-2xl my-4">
      <div className="container mx-auto h-auto ">
        <div className="flex items-center justify-between h-[80px]">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              Meal Point
            </Link>
          </div>

          <div>
            <ul className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                <li>
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-gray-950 text-xl hover:text-yellow-500 transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center space-x-4">
            <button className="hidden lg:block bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition-colors">
              Reservation
            </button>
            <button className="text-gray-600 hover:text-yellow-500">
              <MdOutlineShoppingCart size={24} />
            </button>
            <button
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <RxCross1 size={24} /> : <CiMenuFries size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-yellow-500"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <button className="bg-yellow-500 text-white px-6 py-2 rounded-full hover:bg-yellow-600">
              Reservation
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
