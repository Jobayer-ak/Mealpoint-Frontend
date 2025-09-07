'use client';
import Iframe from '../Shared/Iframe';
import ImageIcon from '../Shared/ImageIcon';
import SecDescription from '../Shared/SecDescription';
import SecHeader from '../Shared/SecHeader';
import SecMainHeader from '../Shared/SecMainHeader';

interface IImage {
  srcImage: string;
  title: string;
}

const AboutVideo = () => {
  const description =
    'Assumenda possimus eaque illo iste, autem. Porro eveniet, autem ipsam vitae amet repellat repudiandae tenetur, quod corrupti consectetur cum? Repudiandae dignissimos fugiat sit nam. Tempore aspernatur quae repudiandae dolorem, beatae dolorum, praesentium itaque et quam quaerat. Cumque, consequatur!';

  const srcList: IImage[] = [
    {
      srcImage: '/assets/about/icons/image-icon-1.png',
      title: 'HTFG 2020',
    },
    {
      srcImage: '/assets/about/icons/image-icon-2.png',
      title: 'HTFG 2018',
    },

    {
      srcImage: '/assets/about/icons/image-icon-3.png',
      title: 'GFA 2019',
    },
    {
      srcImage: '/assets/about/icons/image-icon-4.png',
      title: 'LUA 2021',
    },
  ];

  return (
    <div className="rounded-md relative">
      {/* text conent */}
      <div className="justify-items-center">
        <SecHeader
          header="About Us"
          className=""
          spanClass="ms-[29px] mb-5"
          headerClass="uppercase font-semibold text-md text-[#192f36] tracking-widest"
        />

        <SecMainHeader
          content={
            <>
              We invite you to <br className="" /> visit our restaurant
            </>
          }
          className=" text-[#192f36] text-6xl font-extrabold text-center mt-6 tracking-wide"
        />

        <SecDescription
          content={description}
          className="text-center mt-8 text-[#192f36] font-light px-12 tracking-wide"
        />
      </div>

      {/* video content */}
      <div className="flex justify-center gap-30 mt-24 ">
        {srcList.map((item, index) => (
          <ImageIcon key={index} srcImage={item.srcImage} title={item.title} />
        ))}
      </div>

      {/* video with iframe */}
      <Iframe />
    </div>
  );
};

export default AboutVideo;
