import Container from '../../components/container/Container';
import MenuPage from '../../components/menuPage/MenuPage';
import DarkOverlay from '../../components/Shared/DarkOverlay';

const Menu = () => {
  return (
    <div className="relative">
      <DarkOverlay />
      <Container>
        <MenuPage />
      </Container>
    </div>
  );
};

export default Menu;
