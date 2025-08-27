const HorizontalLine = () => {
  return (
    <div
      className="h-[6px]"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(25,48,45,0.3) 2px, transparent 1.5px)',
        backgroundSize: '10px 10px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat-x',
      }}
    ></div>
  );
};

export default HorizontalLine;
