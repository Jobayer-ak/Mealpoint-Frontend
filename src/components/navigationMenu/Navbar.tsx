'use client';

import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { LiaShoppingBagSolid } from 'react-icons/lia';
import { RxCross1 } from 'react-icons/rx';
import { clearUserProfile } from '../../redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hook/hook';
import { useOutsideClick } from '../../redux/hook/useOutsideClick';
import CartDropdown from '../cart/CartDropdown';

const NAV_LINKS = [
  { title: 'HOME', href: '/' },
  { title: 'ABOUT US', href: '/about-us' },
  { title: 'MENU', href: '/menu' },
  { title: 'RESERVATION', href: '/reservation' },
  { title: 'BLOG', href: '/blog' },
  { title: 'CONTACT', href: '/contact' },
  { title: 'SHOP', href: '/shop' },
];

interface NavLinkProps {
  href: string;
  title: string;
  onClick?: () => void;
  className?: string;
}

const NavLink = ({ href, title, onClick }: NavLinkProps) => {
  const pathname = usePathname() || '';
  const isActive =
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={`
        relative text-xs font-bold px-2 tracking-widest transition-all duration-300 
        text-[#183136]
        md:after:content-[''] md:after:absolute md:after:left-0 md:after:-bottom-8
        md:after:h-[4px] md:after:bg-yellow-500 md:after:transition-all md:after:duration-300
        md:after:w-0 md:hover:after:w-full
        ${isActive ? 'md:after:w-full' : ''}
      `}
    >
      {title}
    </Link>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const pathname = usePathname();
  const dispatch = useAppDispatch();

  const cartRef = useRef<HTMLDivElement | null>(null);
  const userMenuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleCart = useCallback(() => setCartOpen((prev) => !prev), []);
  const closeCart = useCallback(() => setCartOpen(false), []);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);
  const closeUserMenu = useCallback(() => setUserMenuOpen(false), []);

  useOutsideClick(cartRef, closeCart);
  useOutsideClick(userMenuRef, closeUserMenu);

  useEffect(() => {
    closeCart();
    closeUserMenu();
  }, [pathname, closeCart, closeUserMenu]);

  const { data: session } = useSession();
  const cart = useAppSelector((state) => state.cart);
  // const user = session?.user;
  const { profile: user } = useAppSelector((state) => state.user);

  console.log('user: ', user);

  return (
    <header className="bg-white shadow-md rounded-lg my-4 relative z-50">
      <nav className="container mx-auto flex items-center justify-between h-[80px] px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-[#183136]">
          Meal Point
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <NavLink href={link.href} title={link.title} />
            </li>
          ))}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          {/* If user not logged in → show Login button */}
          {!user && (
            <Link
              href="/auth/login"
              className="hidden lg:block bg-[#f29e38] text-xs tracking-wider text-[#183136] font-bold px-6 py-2 rounded-full hover:bg-yellow-600 transition cursor-pointer"
            >
              LOGIN
            </Link>
          )}

          {/* Cart */}
          <div ref={cartRef} className="relative">
            <button
              className="text-gray-600 hover:text-yellow-500 cursor-pointer relative"
              onClick={toggleCart}
              aria-label="Cart"
            >
              <LiaShoppingBagSolid size={34} />
              <span className="absolute -top-1 -right-1 w-5 h-5 flex justify-center items-center bg-green-500 text-white rounded-full text-xs">
                {cart?.items.length || 0}
              </span>
            </button>
            <CartDropdown
              isOpen={cartOpen}
              onClose={closeCart}
              className="absolute right-0 top-20 mt-2 z-50"
            />
          </div>

          {/* User Avatar Dropdown */}
          {user && (
            <div ref={userMenuRef} className="relative hidden lg:block">
              <button
                onClick={toggleUserMenu}
                className="flex items-center focus:outline-none cursor-pointer"
                aria-label="User menu"
              >
                {user.profileImage ? (
                  <div className="w-10 h-10 relative rounded-full overflow-hidden">
                    <Image
                      // src={
                      //   'https://tastyc.bslthemes.com/wp-content/uploads/2021/04/face-1.jpg'
                      // }
                      src={user.profileImage}
                      alt={user?.name || 'User'}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-yellow-500 flex items-center justify-center text-white font-semibold">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}
              </button>

              {userMenuOpen && (
                <div className="absolute top-14 -right-2 w-24 bg-white border border-gray-200 rounded-sm shadow-lg z-50">
                  <Link
                    href="/profile"
                    onClick={closeUserMenu}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    onClick={closeUserMenu}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  >
                    Settings
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: '/' });
                      closeUserMenu();
                      dispatch(clearUserProfile());
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 cursor-pointer"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

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
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                title={link.title}
                onClick={() => setIsMenuOpen(false)}
              />
            ))}

            {user ? (
              <>
                <Link
                  href="/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#183136] font-medium"
                >
                  Profile
                </Link>
                <Link
                  href="/settings"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#183136] font-medium"
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    signOut({ callbackUrl: '/' });
                    setIsMenuOpen(false);
                    dispatch(clearUserProfile());
                  }}
                  className="bg-[#f29e38] text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/auth/login"
                onClick={() => setIsMenuOpen(false)}
                className="bg-[#f29e38] text-white px-6 py-2 rounded-full hover:bg-yellow-600 transition text-center"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
