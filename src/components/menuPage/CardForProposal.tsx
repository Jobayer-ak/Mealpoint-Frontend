import Image from 'next/image';
import { AiOutlineShopping } from 'react-icons/ai';

interface ICard {
  name: string;
  srcImage: string;
  description: string;
  price: number;
}

const dishes: IDishes[] = [
  {
    id: 1,
    name: 'Fruit salad',
    src: '/assets/menu/fruit-salad.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'desserts',
    price: 10.0,
  },
  {
    id: 2,
    name: 'Pan cakes',
    src: '/assets/menu/pancakes.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',

    category: 'desserts',
    price: 10.0,
  },
  {
    id: 3,
    name: 'Casserole',
    src: '/assets/menu/casserol.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'dishes',
    price: 10.0,
  },
  {
    id: 4,
    name: 'King burger',
    src: '/assets/menu/king-burger.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'dishes',
    price: 10.0,
  },
  {
    id: 5,
    name: 'Bear',
    src: '/assets/menu/bear.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'drinks',
    price: 10.0,
  },

  {
    id: 6,
    name: 'Juices',
    src: '/assets/menu/juices.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'drinks',
    price: 10.0,
  },
];

const CardForProposal = ({ name, description, srcImage, price }: ICard) => {
  return (
    <div>
      <div className="relative w-full h-60 md:h-96 overflow-hidden group">
        <Image
          src={srcImage}
          alt={'Dish Image'}
          fill
          className="object-cover transform transition-transform duration-500 ease-out group-hover:scale-110"
          sizes="100vw"
        />
      </div>

      {/* content */}
      <div className="p-6 flex flex-col gap-2">
        <h4 className="text-2xl font-extrabold text-[#1f3336] tracking-wide">
          {name}
        </h4>
        <p className="font-extralight text-gray-600 leading-7 tracking-wide antialiased">
          {description}
        </p>

        {/* horizontal line */}
        <div
          className="mt-4"
          style={{
            borderBottom: '2px dotted rgba(26, 47, 51, 0.2)',
            width: '100%',
          }}
        ></div>

        <div className="flex justify-items-center items-center">
          <h3 className="text-[#183136] mb-4 font-bold text-xl">
            <span className="text-[14px] font-semibold">$</span>
            {price}.00
          </h3>
          <AiOutlineShopping
            size={40}
            className="hover:bg-[#f59d39] rounded-[50%] p-2"
          />
        </div>
      </div>
    </div>
  );
};

export default CardForProposal;
