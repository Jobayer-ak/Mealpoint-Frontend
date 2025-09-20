import Container from '../../../components/container/Container';
import Product from '../../../components/products/Product';
import DarkOverlay from '../../../components/Shared/DarkOverlay';
import ShopBanner from '../../../components/shop/ShopBanner';

const page = () => {
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

export default page;
