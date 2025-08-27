import { Button } from '../ui/button';

interface IButton {
  content: string;
  className: string;
}

const ButtonComp = ({ content, className }: IButton) => {
  return (
    <div>
      <Button className={className}>{content}</Button>
    </div>
  );
};

export default ButtonComp;
