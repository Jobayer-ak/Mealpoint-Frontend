import CardWithSocialMedia from '../Shared/CardWithSocialMedia';
import HorizontalLine from '../Shared/featuresIcons/HorizontalLine';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';

interface IChef {
  name: string;
  position: string;
  src: string;
}

const Team = () => {
  const chefInfo: IChef[] = [
    {
      name: 'Paul Trueman',
      position: 'Master Chef',
      src: '/assets/about/team/face-c1.jpg',
    },
    {
      name: 'Oscar Oldman',
      position: 'Master Chef',
      src: '/assets/about/team/face-c2.jpg',
    },
    {
      name: 'Emma Newman',
      position: 'Master Chef',
      src: '/assets/about/team/face-c3.jpg',
    },
  ];

  const description =
    'Porro eveniet, autem ipsam corrupti consectetur cum. Repudiandae dignissimos fugiat sit nam.';
  return (
    <div className="mb-18 ">
      {/* top content */}
      <div className="flex flex-col justify-center gap-6 items-center py-12">
        <SecHeader
          header={'Team'}
          headerClass={'uppercase  text-[#15323d] font-bold tracking-[4px]'}
          spanClass={'ms-[8px] mb-6'}
          className={''}
        />

        <SecMainHeader
          className="text-4xl lg:text-5xl text-[#19302d] font-extrabold text-center -tracking-wide"
          content={
            <>
              They are ready to <br /> treat you
            </>
          }
        />
        <SecDescription
          content={description}
          className="w-full lg:w-1/3 text-md text-[#19302d] text-center leading-7 font-light"
        />
      </div>

      {/* card */}
      <div className="w-full flex flex-col justify-center items-center md:flex-row md:justify-between gap-8 my-18">
        {chefInfo?.map((info, index) => (
          <CardWithSocialMedia
            key={index}
            src={info.src}
            heading={info.name}
            desc={info.position}
          />
        ))}
      </div>

      {/* Horizontal line */}
      <HorizontalLine />
    </div>
  );
};

export default Team;
