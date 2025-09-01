import { Button } from '../ui/button';

interface IButton {
  content: string;
  className: string;
  icon?: React.ReactNode;
  iconClass?: string;
}

const ButtonComp = ({ content, icon, className }: IButton) => {
  return (
    // <div className="relative">
    <Button className={className}>
      {icon && icon}
      {content}
    </Button>
    // </div>
  );
};

export default ButtonComp;
