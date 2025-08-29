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
    <div
      className={`w-auto h-[460px] px-10 py-6 rounded-md shadow text-center`}
      style={{
        border: border ? '2px dotted rgba(26, 47, 51, 0.2)' : 'none',
      }}
    >
      <h3 className="text-black text-2xl text-left font-extrabold mb-8">
        {title}
      </h3>

      <p className="text-pretty text-left mb-4 leading-7">{description}</p>

      <div
        className="mt-4"
        style={{
          borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
          width: '100%',
        }}
      ></div>

      <UserInfo imageSrc={imageSrc} name={name} date={date} className="mt-4" />
    </div>
  );
};

export default SlideCard;
