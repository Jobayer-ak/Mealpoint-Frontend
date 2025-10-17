import Container from '../../../components/container/Container';

import DarkOverlay from '../../../components/Shared/DarkOverlay';
import MenuPage from '../../../pages/menuPage/MenuPage';

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
