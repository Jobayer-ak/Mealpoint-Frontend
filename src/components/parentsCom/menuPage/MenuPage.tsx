'use client';
import Container from '../../container/Container';
import DishTabsMain from '../../menu/DishTabsMain';
import GoodOffer from '../../menu/GoodOffer';
import MenuBanner from '../../menu/MenuBanner';
import SpecialProposal from '../../menu/SpecialProposal';

const MenuPage = () => {
  return (
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
  );
};

export default MenuPage;
