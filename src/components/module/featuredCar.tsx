
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Loading from "@/components/module/loading";
import { toast } from "sonner";
import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";
import { Button } from "../ui/button";
import { Link } from "react-router";

export function CarCarousel() {
  const { data: cars, isLoading, isError } = useGetAllCarsQuery(undefined);

  if (isError) {
    toast.error("Failed to load cars");
    return null;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="py-4 ">
         <div className="flex justify-center items-center">
        <Carousel opts={{ align: "start" }} className="w-full max-w-2xl">
      <CarouselContent>
        {cars?.data?.map((car) => (
          <CarouselItem key={car?._id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-4">
                  <img
                    src={car?.image}
                    alt={car?.model}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h3 className="text-lg font-semibold mt-2">{car?.model}</h3>
                  <p className="text-sm text-gray-500">{car.brand}</p>
                  <p className="text-sm font-bold">${car.price}</p>
                  <p className="outline rounded-md p-1 text-sm mt-1"><Link to={`/cars/${car?._id}`}>
                  View details</Link></p>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    
    </div>
       <Link to='/cars'  className="flex items-center justify-center pt-4">
       <Button>Explore all product</Button>
       </Link >
    </div>
   
  );
}
