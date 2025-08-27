import Image from 'next/image';

interface ISrc {
  src: string;
  alt: string;
}

const Icon = ({ src, alt }: ISrc) => {
  return (
    <div>
      <div>
        <Image src={src} width={80} height={80} alt={alt} />
      </div>
    </div>
  );
};

export default Icon;
