import { Button } from '../ui/button';

interface IButton {
  content: string;
  className?: string; // Make optional for flexibility
  icon?: React.ReactNode;
  iconClass?: string;
  disabled?: boolean; // Optional disabled prop
}

const ButtonComp = ({
  content,
  icon,
  className = '',
  disabled = false,
}: IButton) => {
  return (
    <Button
      className={`${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {content}
    </Button>
  );
};

export default ButtonComp;
