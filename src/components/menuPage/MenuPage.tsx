import DishTabsMain from './DishTabsMain';
import GoodOffer from './GoodOffer';
import MenuBanner from './MenuBanner';
import SpecialProposal from './SpecialProposal';

const MenuPage = () => {
  return (
    <div>
      {/* Menu banner */}
      <MenuBanner />

      {/* Menu tabs */}
      <DishTabsMain />

      {/* Good Offer */}
      <GoodOffer />

      {/* special proposal */}
      <SpecialProposal />
    </div>
  );
};

export default MenuPage;
