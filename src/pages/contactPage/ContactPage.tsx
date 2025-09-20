import ContactBanner from '../../components/contact/ContactBanner';
import ContactInfo from '../../components/contact/ContactInfo';
import Container from '../../components/container/Container';
import DarkOverlay from '../../components/Shared/DarkOverlay';

const ContactPage = () => {
  return (
    <div className="relative">
      <DarkOverlay />
      <Container>
        <ContactBanner />
        <ContactInfo />
      </Container>
    </div>
  );
};

export default ContactPage;
