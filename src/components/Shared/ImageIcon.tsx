'use-client';
import Image from 'next/image';
interface ImageIconProps {
  srcImage: string;
  title: string;
}

const ImageIcon = ({ srcImage, title }: ImageIconProps) => {
  return (
    <div className="transition-all duration-300 opacity-50 hover:opacity-100">
      <Image src={srcImage} alt={''} width={75} height={75} quality={100} />

      <p className=" uppercase text[#192f36] font-semi-bold mt-3">{title}</p>
    </div>
  );
};

export default ImageIcon;
