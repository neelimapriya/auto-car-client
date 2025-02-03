import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetAllCarsQuery } from "@/redux/features/cars/carApi";
import { useState } from "react";
import { Link } from "react-router";

const Cars = () => {
  const { data: cars } = useGetAllCarsQuery(undefined);
  console.log(cars);

  return (
    <div>
        <h2 className="text-center p-5 text-4xl text-red-700 uppercase font-bold">Car Collection</h2>
        <hr />
        <br />
        
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
        {cars?.data?.length !== 0 ? (
          cars?.data?.map((car, index) => (
            <div
              className="border hover:border-primary transition-all transform duration-500 ease-in-out rounded-xl px-2.5 py-3"
              key={index}
            >
                 <div className="h-48 overflow-hidden rounded-md">
                                    <img
                                        src="https://carhaat.com.bd/upload/car_images/1822494498936614.jpg"
                                        alt={car.brand}
                                        width={400}
                                        height={400}
                                        className="rounded-md h-48 hover:scale-105 transform transition-all duration-300 animate-in ease-in-out w-full object-cover"
                                    />
                                </div>
              <div className="space-y-1 py-2.5">
                <h3 className="text-lg font-semibold">{car.category}</h3>
                <p className="text-sm line-clamp-2 text-muted-foreground">
                  {car.description}
                </p>
                <div className="grid grid-cols-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">Brand :</span>
                    <span className="text-sm">{car.brand}</span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-sm font-bold"> Quantity :</span>
                    <span className="text-sm">{car.quantity}</span>
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold">Model :</span>
                    <span className="text-sm">{car.model}</span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <span className="text-sm font-bold">Price :</span>
                    <span className="text-sm">${car.price}</span>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                {car.inStock ? (
                  <Badge variant="outline" className="bg-green-200">
                    Available
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="whitespace-nowrap bg-red-200"
                  >
                    Not Available
                  </Badge>
                )}
                <Button variant={"outline"} size={"sm"} asChild>
                  <Link to={`/bike-details/${car._id}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center py-10 col-span-4">
            <h3 className="text-xl font-medium">No Bikes Available</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cars;
