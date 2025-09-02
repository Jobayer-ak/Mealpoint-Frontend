import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import Link from 'next/link';

interface BreadCrumbWithArrowProps {
  arrowSize?: number;
}

const BreadCrumbWithArrow: React.FC<BreadCrumbWithArrowProps> = ({
  arrowSize,
}) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <div className="flex flex-nowrap justify-center items-center gap-4">
          <BreadcrumbItem>
            <BreadcrumbLink
              asChild
              className="text-[10px] font-semibold tracking-wider"
            >
              <Link
                href="/"
                className="text-[10px] font-semibold -tracking-wider"
              >
                Home
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator size={arrowSize} className="mb-1" />

          <BreadcrumbItem>
            <BreadcrumbLink asChild className="text-[10px] font-semibold">
              <Link href="/components" className="tracking-wider">
                Components
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* <BreadcrumbSeparator size={arrowSize} /> */}
        </div>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbWithArrow;
