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
        <div className="flex flex-nowrap justify-center items-center gap-1">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbSeparator size={arrowSize} />

          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/components">Components</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>

          {/* <BreadcrumbSeparator size={arrowSize} /> */}
        </div>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadCrumbWithArrow;
