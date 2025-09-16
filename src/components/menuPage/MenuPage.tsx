import Container from '../container/Container';
import DishTabsMain from './DishTabsMain';
import GoodOffer from './GoodOffer';
import MenuBanner from './MenuBanner';
import SpecialProposal from './SpecialProposal';

const MenuPage = () => {
  return (
    <div className="">
      <Container>
        {/* Menu banner */}
        <MenuBanner />

        {/* Menu tabs */}
        <DishTabsMain />

        {/* Good Offer */}

        <GoodOffer />

        {/* special proposal */}
        <SpecialProposal />
      </Container>
    </div>
  );
};

export default MenuPage;
