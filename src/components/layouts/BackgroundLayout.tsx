import DarkOverlay from '../Shared/DarkOverlay';

const BackgroundLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative min-h-screen">
      {/* Fixed background with overlay */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          backgroundImage: "url('/assets/background.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <DarkOverlay />
      </div>

      {/* Main content */}
      <div className="relative z-0">{children}</div>
    </div>
  );
};

export default BackgroundLayout;
