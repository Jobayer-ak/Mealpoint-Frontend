import Login from '../../components/auth/login/Login';
import Container from '../../components/container/Container';

const LoginPage = () => {
  return (
    <div className="relative min-h-screen bg-[url(/assets/Login.png)] bg-no-repeat bg-cover bg-bottom py-4">
      {/* Strong Black Overlay */}
      <div className="absolute inset-0 bg-black/85"></div>

      {/* Content */}
      <div className="relative z-10">
        <Container>
          <Login />
        </Container>
      </div>
    </div>
  );
};

export default LoginPage;
