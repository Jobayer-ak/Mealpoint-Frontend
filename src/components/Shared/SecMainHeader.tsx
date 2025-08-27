interface IHeader {
  className: string;
  content: string;
}

const SecMainHeader = ({ className, content }: IHeader) => {
  return (
    <div>
      <h3 className={className}>{content}</h3>
    </div>
  );
};

export default SecMainHeader;
