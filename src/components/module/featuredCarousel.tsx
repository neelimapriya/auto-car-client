
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

const carBrands = [
  { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/Toyota_logo_%28Red%29.svg/2560px-Toyota_logo_%28Red%29.svg.png" },
  { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/BMW.svg/1015px-BMW.svg.png" },
  { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/3/39/Mercedes-Benz_logo.svg" },
  { name: "Audi", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Audi-logo.svg" },
  { name: "Ford", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Ford_logo_flat.svg" },
  { name: "Honda", logo: "https://upload.wikimedia.org/wikipedia/commons/7/79/Honda_logo.svg" },
  { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png" },
];

const BrandCarousel = () => {
  return (
    <div className="w-full max-w-4xl mx-auto py-8 overflow-hidden">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="relative"
      >
        <CarouselContent className="flex items-center gap-6 animate-marquee">
          {carBrands.map((brand, index) => (
            <CarouselItem
              key={index}
              className="flex-shrink-0 w-1/3 sm:w-1/4 md:w-1/6 lg:w-1/6 flex flex-col items-center"
            >
              <motion.img
                src={brand?.logo}
                alt={brand?.name}
                className="w-20 h-20 object-contain"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <p className="mt-2 text-sm font-semibold">{brand.name}</p>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default BrandCarousel;
