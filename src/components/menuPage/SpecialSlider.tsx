import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import SpecialSliderCard from './SpecialSliderCard';

interface IDishes {
  id: number;
  name: string;
  src: string;
  description: string;
  category: string;
  price: number;
}

const dishes: IDishes[] = [
  {
    id: 1,
    name: 'Fruit salad',
    src: '/assets/menu/fruit-salad.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'desserts',
    price: 10.5,
  },
  {
    id: 2,
    name: 'Pan cakes',
    src: '/assets/menu/pancakes.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',

    category: 'desserts',
    price: 10.5,
  },
  {
    id: 3,
    name: 'Casserole',
    src: '/assets/menu/casserol.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'dishes',
    price: 10.5,
  },
  {
    id: 4,
    name: 'King burger',
    src: '/assets/menu/king-burger.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'dishes',
    price: 10.5,
  },
  {
    id: 5,
    name: 'Bear',
    src: '/assets/menu/bear.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'drinks',
    price: 10.5,
  },

  {
    id: 6,
    name: 'Juices',
    src: '/assets/menu/juices.webp',
    description: 'Consectetur adipisicing elit. Soluta impedit, saepe',
    category: 'drinks',
    price: 10.99,
  },
];

const SpecialSlider = () => {
  return (
    <div className="flex justify-center pt-12 pb-6">
      <Carousel
        opts={{
          align: 'start',
        }}
        className="w-full"
      >
        <CarouselContent>
          {dishes.map((dish, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 py-4"
            >
              <div className="">
                <SpecialSliderCard
                  srcImage={dish.src}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                  key={index}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default SpecialSlider;
