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
import { Calendar, Car, MapPin, Star, Clock, Shield } from "lucide-react";
import ReviewsPage from "@/components/module/reviews";

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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-black dark:to-black">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8">
        {/* Car Details Card */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 items-start bg-white dark:bg-black/40 rounded-2xl shadow-xl p-6 md:p-10">
          {/* Car Image */}
          <div className="flex flex-col gap-4 items-center justify-center">
            {car?.data?.image && (
              <img
                src={car?.data?.image || ""}
                alt={car?.data?.name}
                className="object-cover rounded-xl shadow-lg w-full max-w-md h-72 sm:h-96 mx-auto border border-gray-200 dark:border-gray-800"
              />
            )}
            <div className="flex gap-2 mt-2">
              <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
                <Car className="inline w-4 h-4 mr-1" /> {car?.data?.category}
              </Badge>
              <Badge variant="outline" className="rounded-full px-3 py-1 text-xs">
                <Shield className="inline w-4 h-4 mr-1 text-green-500" /> {car?.data?.inStock ? "Certified" : "Not Certified"}
              </Badge>
            </div>
          </div>
          {/* Car Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="font-bold text-3xl lg:text-4xl text-gray-900 dark:text-white flex items-center gap-2">
                {car?.data?.brand} <span className="text-lg font-normal text-gray-500">{car?.data?.model}</span>
              </h1>
              <div className="flex flex-wrap gap-3 mt-2 text-gray-600 dark:text-gray-300 text-sm">
                <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {car?.data?.year}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {car?.data?.category}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Added: {new Date(car?.data?.createdAt).toLocaleDateString()}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> Updated: {new Date(car?.data?.updatedAt).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="grid gap-2 text-base">
              <div className="flex items-center gap-2">
                <span className="font-medium">Stock:</span>
                <span>{car?.data?.quantity}</span>
                <Badge variant="outline" className="rounded-full px-2 py-1 ml-2">
                  {car?.data?.inStock ? "Available" : "Not Available"}
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Description:</span>
                <span className="text-gray-500">{car?.data?.description}</span>
              </div>
              {/* Static Car Info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-gray-700 dark:text-gray-300">
                <span className="flex items-center gap-2"><Star className="w-4 h-4 text-yellow-500" /> Rating: 4.7/5</span>
                <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-green-500" /> Warranty: 2 Years</span>
                <span className="flex items-center gap-2"><Car className="w-4 h-4 text-blue-500" /> Fuel: Petrol</span>
                <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-purple-500" /> Mileage: 32,000 km</span>
                <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-red-500" /> Location: Dhaka, Bangladesh</span>
                <span className="flex items-center gap-2"><Car className="w-4 h-4 text-pink-500" /> Transmission: Automatic</span>
                <span className="flex items-center gap-2"><Car className="w-4 h-4 text-gray-500" /> Color: Pearl White</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-2">
              <span className="font-bold text-xl">${car?.data?.price}</span>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button variant="default" onClick={() => setIsOpen(true)}>
                    <ShoppingCart className="mr-2" /> Order car
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
        {/* Reviews Section */}
        <div className="mt-12">
          <ReviewsPage />
        </div>
      </div>
    </div>
  );
};

export default CarDetails;
