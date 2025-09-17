'use client';
import Container from '../../components/container/Container';
import Product from '../../components/products/Products';
import DarkOverlay from '../../components/Shared/DarkOverlay';
import ShopBanner from '../../components/shop/ShopBanner';

const ShopPage = () => {
  return (
    <div className="relative">
      <DarkOverlay />
      <Container>
        <ShopBanner />

        <Product />
      </Container>
    </div>
  );
};

export default ShopPage;
