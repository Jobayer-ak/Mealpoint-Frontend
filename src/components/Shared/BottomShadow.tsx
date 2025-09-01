const BottomShadow = () => {
  return (
    <div
      className="absolute bottom-[-25px] w-full left-[9px] bg-white/15 rounded-md z-21"
      style={{
        width: 'calc(100% - 20px)',
        height: '15px',
        transform: 'translateY(-15px)',
      }}
    ></div>
  );
};

export default BottomShadow;
