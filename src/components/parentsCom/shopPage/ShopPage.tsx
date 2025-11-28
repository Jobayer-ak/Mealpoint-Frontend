'use client';
import Container from '../../container/Container';
import DarkOverlay from '../../Shared/DarkOverlay';
import Products from '../../shop/Products';
import ShopBanner from '../../shop/ShopBanner';

const ShopPage = () => {
  return (
    <div className="relative">
      <DarkOverlay />
      <Container>
        <ShopBanner />

        <Products />
      </Container>
    </div>
  );
};

export default ShopPage;
