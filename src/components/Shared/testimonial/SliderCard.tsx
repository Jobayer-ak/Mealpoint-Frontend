import { RxQuote } from 'react-icons/rx';
import UserInfo from './UserInfo';

interface SlideCardProps {
  title: string;
  description: string;
  imageSrc: string;
  name: string;
  date: string;
  border?: boolean;
}

const SlideCard = ({
  title,
  description,
  imageSrc,
  name,
  date,
  border = true,
}: SlideCardProps) => {
  return (
    <div className="pt-8">
      <div
        className="h-[480px] px-10 pt-10 pb-6 rounded-md shadow text-left relative overflow-visible"
        style={{
          border: border ? '2px dotted rgba(26, 47, 51, 0.2)' : 'none',
          boxShadow: border ? 'none' : ' 0 0 10px 10px rgba(0, 128, 0, 0.1)',
        }}
      >
        {!border && (
          <RxQuote className="absolute -top-8 right-4 text-[#f29e38] text-6xl" />
        )}
        <h3 className="text-black text-2xl font-extrabold mb-8">{title}</h3>

        <p className="text-pretty text-md font-light mb-4 leading-7">
          {description}
        </p>

        <div
          className="mt-4"
          style={{
            borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
            width: '100%',
          }}
        ></div>

        <UserInfo
          imageSrc={imageSrc}
          name={name}
          date={date}
          className="mt-4"
        />
      </div>
    </div>
  );
};

export default SlideCard;
