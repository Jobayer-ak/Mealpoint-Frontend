import Container from '../container/Container';
import AboutSection from './AboutSection';
import MobileAppSection from './MobileAppSection';
import NewsLetter from './NewsLetter';
import Slider from './Slider';
import Testimonials from './Testimonials';

const slides = [
  {
    id: 1,
    imageUrl: '/assets/sliderImages/banner-1.jpg',
    title: 'Welcome Back to Meal Point',
    subtitle:
      'Seek duties, or wise sayings to follow through work furthermore produce these things readily',
  },
  {
    id: 2,
    imageUrl: '/assets/sliderImages/banner-2.jpg',
    title: 'Reserve Your Table Today',
    subtitle:
      'Seek duties, or wise sayings to follow through work furthermore produce these things readily',
  },
  {
    id: 3,
    imageUrl: '/assets/sliderImages/banner-3.jpg',
    title: 'Visit Our Online Shop',
    subtitle:
      'Seek duties, or wise sayings to follow through work furthermore produce these things readily',
  },
];

const HomePage = () => {
  return (
    <main>
      {/* Full-width slider */}
      <Container fullWidth>
        <Slider slides={slides} />
      </Container>

      <Container>
        <AboutSection />
      </Container>
      <Container fullWidth>
        <MobileAppSection />
      </Container>
      <Container>
        <Testimonials />
        <NewsLetter />
      </Container>
    </main>
  );
};

export default HomePage;
