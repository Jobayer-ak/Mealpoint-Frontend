'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useMemo } from 'react';
import { FaAngleRight } from 'react-icons/fa6';
import BottomShadow from './BottomShadow';

const BreadCrumb = () => {
  const pathname = usePathname();

  const pathSegments = useMemo(
    () => pathname?.split('/').filter(Boolean),
    [pathname]
  );

  const breadcrumbs = useMemo(
    () =>
      pathSegments?.map((segment, index) => {
        const href = '/' + pathSegments.slice(0, index + 1).join('/');
        const label = decodeURIComponent(segment)
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase());

        return { href, label };
      }),
    [pathSegments]
  );

  return (
    <nav
      aria-label="Breadcrumb"
      className="relative bg-[#f29e38]/90 px-6 py-5 rounded-md shadow-sm"
    >
      <BottomShadow />
      <ol className="flex justify-center items-center gap-2 text-[#183136] text-xs font-bold tracking-widest">
        {/* Home */}
        <li className="flex items-center">
          <Link href="/" className="uppercase transition-colors duration-200">
            Home
          </Link>
        </li>

        {/* Dynamic path segments */}
        {breadcrumbs?.map((crumb, index) => (
          <Fragment key={crumb.href}>
            {/* Separator Icon */}
            <li className="flex justify-center">
              <FaAngleRight
                size={14}
                fill="[#183136]"
                className="text-[#183136] opacity-70 mx-1 mb-[4px]"
              />
            </li>

            {/* Label */}
            <li className="flex items-center">
              {index === breadcrumbs.length - 1 ? (
                <span className="text-[#7a5019] uppercase">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="uppercase hover:text-[#9b6520] transition-colors duration-200"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
