import Container from '../../components/container/Container';
import AboutSection from '../../components/home/AboutSection';
import MobileAppSection from '../../components/home/MobileAppSection';
import NewsLetter from '../../components/home/NewsLetter';
import Slider from '../../components/home/Slider';
import Testimonials from '../../components/home/Testimonials';

const slides = [
  {
    id: 1,
    imageUrl: '/assets/sliderImages/banner-1.jpg',
    title: (
      <>
        Welcome Back <br /> To Meal Point
      </>
    ),
    subtitle:
      'Seek duties, or wise sayings to follow through work furthermore produce these things readily',
  },
  {
    id: 2,
    imageUrl: '/assets/sliderImages/banner-2.jpg',
    title: (
      <>
        Reserve Your <br /> Table Today
      </>
    ),
    subtitle:
      'Seek duties, or wise sayings to follow through work furthermore produce these things readily',
  },
  {
    id: 3,
    imageUrl: '/assets/sliderImages/banner-3.jpg',
    title: (
      <>
        Visit To Our <br /> Online Shop
      </>
    ),
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
