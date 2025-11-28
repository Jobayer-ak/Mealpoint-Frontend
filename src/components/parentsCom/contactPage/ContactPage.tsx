import ContactBanner from '../../contact/ContactBanner';
import ContactInfo from '../../contact/ContactInfo';
import Container from '../../container/Container';
import DarkOverlay from '../../Shared/DarkOverlay';

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
