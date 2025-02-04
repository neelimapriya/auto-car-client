/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppDispatch } from "@/redux/hook";
import { TOrder } from "@/types/orderType";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { setOrderData } from "@/redux/features/order/orderSlice";

interface OrderModalProps {
    car: TOrder;
    isBooked: boolean,
    totalPrice: number,
    quantity:number
    open: boolean;
    onClose: () => void;
}

const OrderModal = ({ car, open, onClose }: OrderModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
     
    });

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const onSubmit = async (data: any) => {

        const OrderData = {
            car: car._id,
            isBooked: true,
            totalPrice: car.car?.price,
            quantity:1
           
        };
        dispatch(setOrderData(OrderData));
        onClose();
        reset();
        toast.success("Redirecting to Payment Page...", { duration: 1000 });
        setTimeout(() => navigate("/payment"), 1000);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="sm:max-w-[425px]"
                aria-describedby={undefined}
            >
                <DialogHeader>
                    <DialogTitle>Book Now</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4">
                        <div>
                            <Label htmlFor="startDate" className="text-right">
                                Start Date
                            </Label>
                            <Input
                                id="startDate"
                                type="date"
                                {...register("startDate", {
                                    required: "Date is required",
                                })}
                            />
                        
                        </div>
                        <div>
                            <Label htmlFor="startTime" className="text-right">
                                Start Time
                            </Label>
                            <Input
                                id="startTime"
                                type="time"
                                {...register("startTime", {
                                    required: "Time is required",
                                })}
                            />
                            {errors.startTime && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.startTime.message}
                                </p>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" className="mx-auto">
                            Pay Now
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
       
    );
};
export default OrderModal