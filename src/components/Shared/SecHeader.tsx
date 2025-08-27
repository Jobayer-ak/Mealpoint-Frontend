interface IHeader {
  header: string;
  className: string;
}

const SecHeader = ({ header, className }: IHeader) => {
  return (
    <div className={className}>
      <span className="block h-[4px] w-10 bg-amber-500 rounded-2xl"></span>
      <h4 className="">{header}</h4>
    </div>
  );
};

export default SecHeader;
