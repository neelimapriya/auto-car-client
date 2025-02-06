import Loading from "@/components/module/loading";
import { Badge } from "@/components/ui/badge";
import { useAppDispatch } from "@/redux/hook";
import { Button } from "@/components/ui/button";
import { useGetSingleCarQuery } from "@/redux/features/cars/carApi";
import { addToCart } from "@/redux/features/cart/cartSlice";

import { ShoppingCart } from "lucide-react";
import {  useParams } from "react-router";
import { toast } from "sonner";

const CarDetails = () => {
  const dispatch = useAppDispatch();
  const { carId } = useParams();
  const {
    data: car,
    isLoading,
    isError,
  } = useGetSingleCarQuery(carId as unknown as string);
  console.log(car);
  if (isError) {
    toast.error("Something went wrong!");
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        car: car.data?._id,
        brand: car.data?.brand,
        price: car.data?.price,
        quantity: 1,
        inStock: car.data?.inStock,
        image: car.data?.image,
      }),
      toast.success("Add in cart")
    );
  };
  return (
    <div className="container">
      <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start mx-auto py-6">
        <div className="grid gap-4 md:gap-10 items-start">
          {car?.data?.image && (
            <>
              <div className="hidden md:flex items-start rounded-lg">
                <img
                  src={car?.data?.image || ""}
                  alt={car?.data?.name}
                  className="object-fill rounded-lg overflow-hidden h-96 w-auto mx-auto"
                />
              </div>
              <div className="md:hidden">
                <img
                  src={car?.data?.image || ""}
                  alt={car?.data?.name}
                  className="aspect-square object-cover w-full rounded-lg overflow-hidden"
                />
              </div>
            </>
          )}
        </div>
        <div className="grid gap-2.5 md:gap-2 items-start pl-5 md:pl-0">
          <div className="grid gap-4">
            <h1 className="font-bold text-3xl lg:text-4xl">
              {car?.data?.category}
            </h1>
            <div className="grid gap-4 text-sm leading-loose">
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <div className="font-medium">Model:</div>
                  <div>{car?.data?.model}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-medium">Brand:</div>
                  <div>{car?.data?.brand}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-medium">In Stock:</div>
                  <div>{car?.data?.quantity}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-medium">Year:</div>
                  <div>{car?.data?.year}</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="font-medium">Availability:</div>
                  <Badge variant="outline" className="rounded-full px-2 py-1">
                    {car?.data?.inStock ? "Available" : "Not Available"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-2.5">
            <div className="font-medium">
              <span>Description:</span>
              <p className="text-sm font-normal text-gray-500">
                {car?.data?.description}
              </p>
            </div>
            <div className="font-bold space-x-2">
              <span>Price:</span>
              <span className="text-xl">${car?.data?.price}</span>
            </div>

            <Button
              onClick={() => handleAddToCart()}
              disabled={!car?.data?.inStock}
              className="w-full md:w-auto"
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
