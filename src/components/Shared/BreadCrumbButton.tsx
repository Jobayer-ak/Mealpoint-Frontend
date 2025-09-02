import { Button } from '../ui/button';
import BreadCrumbWithArrow from './BreadCrumbWithArrow';
import ButtonShadow from './ButtonShadow';

const BreadCrumbButton = () => {
  return (
    <Button className="bg-[#f29e38] px-6 py-6 uppercase flex justify-items-center gap-2 relative">
      {/* Pass bigger arrow size for the button */}
      <BreadCrumbWithArrow arrowSize={28} />
      <ButtonShadow />
    </Button>
  );
};

export default BreadCrumbButton;
