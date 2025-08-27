interface IContent {
  content: string;
  className: string;
}

const SecDescription = ({ content, className }: IContent) => {
  return (
    <div className={className}>
      <p>{content}</p>
    </div>
  );
};

export default SecDescription;
