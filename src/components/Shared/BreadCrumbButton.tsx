import { Button } from '../ui/button';
import BreadCrumbWithArrow from './BreadCrumbWithArrow';

const BreadCrumbButton = () => {
  return (
    <Button className="bg-[#f29e38] tracking-wider uppercase text-sm px-6 py-3 flex items-center gap-2 cursor-pointer">
      {/* Pass bigger arrow size for the button */}
      <BreadCrumbWithArrow arrowSize={28} />
    </Button>
  );
};

export default BreadCrumbButton;
