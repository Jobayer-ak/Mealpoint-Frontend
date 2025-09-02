const ButtonShadow = () => {
  return (
    <div
      className="absolute bottom-1 left-[10px] bg-white/10 rounded-sm z-0"
      style={{
        width: 'calc(100% - 20px)',
        height: '12px',
        transform: 'translateY(12px)',
      }}
    ></div>
  );
};

export default ButtonShadow;
