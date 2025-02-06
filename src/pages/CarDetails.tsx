/* eslint-disable @typescript-eslint/no-unused-vars */
import Loading from "@/components/module/loading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useGetSingleCarQuery } from "@/redux/features/cars/carApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ShoppingCart } from "lucide-react";
import { useParams } from "react-router";
import { toast } from "sonner";
import { usePlaceOrderMutation } from "@/redux/features/order/orderApi";
import { useAppSelector } from "@/redux/hook";
import { useState } from "react";

const CarDetails = () => {
  const { carId } = useParams();
  const user = useAppSelector((state) => state.auth.user);
  // console.log(user);
  const email = user?.email;
  // console.log(carId);
  const {
    data: car,
    isLoading,
    isError,
  } = useGetSingleCarQuery(carId as unknown as string);
  const [confirmOrder] = usePlaceOrderMutation();
  const [isOpen, setIsOpen] = useState(false);
  if (isError) {
    toast.error("Something went wrong!");
  }

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleOrder = async () => {
    try {
      const payload = {
        car: carId,
        quantity: 1,
        email: email,
        totalPrice: car?.data?.price,
      };
      await confirmOrder(payload).unwrap();
      toast.success("Order placed successfully!");
      setIsOpen(false);
    } catch (err) {
      toast.error("Failed to place order.");
    }
  };
  // console.log(error);

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
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="default" onClick={() => setIsOpen(true)}>
                  <ShoppingCart></ShoppingCart> Order car
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Order Car</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to order this car {car?.data?.model}?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button disabled={!car?.data?.inStock} onClick={handleOrder}>
                    Confirm Order
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
