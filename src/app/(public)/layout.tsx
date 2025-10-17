import Container from '../../components/container/Container';
import Footer from '../../components/footer/Footer';
import Navbar from '../../components/navigationMenu/Navbar';

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <BackgroundLayout> */}
      {/* navbar */}
      <header className="fixed top-0 left-0 z-40 w-full bg-transparent">
        <Container>
          <Navbar />
        </Container>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
      {/* </BackgroundLayout> */}
    </>
  );
}
