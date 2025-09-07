import Image from 'next/image';
import SocialMediaGroup from '../ui/SocialMediaGroup';
import SecDescription from './SecDescription';
import SecMainHeader from './SecMainHeader';

interface ICard {
  src: string;
  heading: string;
  desc: string;
}

const CardWithSocialMedia = ({ src, heading, desc }: ICard) => {
  return (
    <div className="w-full max-w-sm rounded-md overflow-hidden shadow-lg bg-white hover:shadow-xl transition-all duration-300 pb-6">
      {/* Image */}

      <div className="relative w-full h-100 overflow-hidden group">
        <Image
          src={src}
          alt="Chef Image"
          fill
          quality={100}
          className="object-cover object-top transform transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>

      {/* info */}

      <SecMainHeader
        className="text-2xl text-[#19302d] text-center font-bold mt-8 -tracking-wider"
        content={heading}
      />

      <SecDescription
        content={desc}
        className="w-full mt-8 text-xl text-[#19302d] text-center leading-7 font-light"
      />

      {/* horizontal line */}
      <div className="px-8">
        <div
          className="mt-4"
          style={{
            borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
            width: '100%',
          }}
        ></div>

        {/* social icons */}
        <div className="justify-items-center mt-6 mb-2">
          <SocialMediaGroup
            links={[
              {
                platform: 'facebook',
                href: 'https://facebook.com/yourpage',
              },
              {
                platform: 'instagram',
                href: 'https://instagram.com/yourpage',
              },
              {
                platform: 'linkedin',
                href: 'https://linkedin.com/company/yourcompany',
              },
              { platform: 'twitter', href: 'https://x.com/yourpage' },
            ]}
            size="md"
            variant="default"
            gap="md"
          />
        </div>
      </div>
    </div>
  );
};

export default CardWithSocialMedia;
