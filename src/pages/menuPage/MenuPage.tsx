import Container from '../../components/container/Container';
import DishTabsMain from '../../components/menu/DishTabsMain';
import GoodOffer from '../../components/menu/GoodOffer';
import MenuBanner from '../../components/menu/MenuBanner';
import SpecialProposal from '../../components/menu/SpecialProposal';

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
