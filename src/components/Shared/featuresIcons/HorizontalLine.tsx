const HorizontalLine = () => {
  return (
    <div
      className="h-[6px]"
      style={{
        backgroundImage:
          'radial-gradient(circle, rgba(25,48,45,0.3) 1px, transparent 1.2px)',
        backgroundSize: '5px 5px',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat-x',
      }}
    ></div>
  );
};

export default HorizontalLine;
