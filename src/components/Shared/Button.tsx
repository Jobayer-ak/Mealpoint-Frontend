import { Button } from '../ui/button';

interface IButton {
  content: string;
  className: string;
  icon?: React.ReactNode;
}

const ButtonComp = ({ content, icon, className }: IButton) => {
  return (
    <div>
      <Button className={className}>
        {icon && icon}
        {content}
      </Button>
    </div>
  );
};

export default ButtonComp;
