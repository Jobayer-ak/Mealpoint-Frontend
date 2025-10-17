import Container from '../../../../components/container/Container';
import ProductDetails from '../../../../components/products/ProductDetails';
import DarkOverlay from '../../../../components/Shared/DarkOverlay';
import ShopBanner from '../../../../components/shop/ShopBanner';

const page = () => {
  return (
    <div className="relative">
      <DarkOverlay />
      <Container>
        <ShopBanner />

        <ProductDetails />
      </Container>
    </div>
  );
};

export default page;
