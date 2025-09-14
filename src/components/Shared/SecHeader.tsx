interface IHeader {
  header: string | boolean;
  className: string;
  headerClass?: string;
  spanClass?: string;
}

const SecHeader = ({ header, className, headerClass, spanClass }: IHeader) => {
  return (
    <div className={className}>
      <span
        className={`block h-[4px] w-10 bg-amber-500 rounded-2xl ${spanClass} `}
      ></span>
      <p className={headerClass}>{header}</p>
    </div>
  );
};

export default SecHeader;
