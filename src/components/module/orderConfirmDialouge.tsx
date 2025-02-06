import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "@/components/ui/alert-dialog";
import { usePlaceOrderMutation } from "@/redux/features/order/orderApi";
  import { ErrorResponse } from "@/types";
import { TCar } from "@/types/carType";
  import { SerializedError } from "@reduxjs/toolkit";
  import { useEffect } from "react";
  import { toast } from "sonner";

  
  interface ConfirmOrderModalProps {
    car: TCar | null;
    open: boolean;
    onClose: () => void;
  }
  
  const ConfirmOrderModal = ({ car, open, onClose }: ConfirmOrderModalProps) => {
    const [confirmOrder, { isSuccess, isError, error }] = usePlaceOrderMutation();
  
    useEffect(() => {
      if (isError) {
        const errorResponse = error as ErrorResponse | SerializedError;
  
        const errorMessage =
          (errorResponse as ErrorResponse)?.data?.message ||
          "Something Went Wrong";
  
        toast.error(errorMessage);
      } else if (isSuccess) {
        toast.success("Your order placed successfully");
      }
    }, [isError, isSuccess, error]);
  
    const handleOrder = async (id: string) => {
      await confirmOrder(id);
    };
  
    return (
      <AlertDialog open={open} onOpenChange={onClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Order car</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to order this car &quot;
              {car?.model}&quot;?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleOrder(car?._id as string)}>
              Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };
  
  export default ConfirmOrderModal;
  