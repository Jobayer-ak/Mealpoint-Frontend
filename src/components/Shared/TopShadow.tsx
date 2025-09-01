const TopShadow = () => {
  return (
    <div
      className="absolute top-[-25px]  w-full left-[9px] bg-white/15 rounded-sm z-21"
      style={{
        width: 'calc(100% - 20px)',
        height: '15px',
        transform: 'translateY(15px)',
      }}
    ></div>
  );
};

export default TopShadow;
