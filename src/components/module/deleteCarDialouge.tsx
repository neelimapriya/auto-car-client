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
import { TCar } from "@/types/carType"; 
import { ErrorResponse } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { toast } from "sonner";
import { useDeleteCarsMutation } from "@/redux/features/cars/carApi";

interface DeleteCarDialogProps {
    car: TCar | null;
    open: boolean;
    onClose: () => void;
}

const DeleteCarDialog = ({
    car,
    open,
    onClose,
}: DeleteCarDialogProps) => {
    const [deleteCar, { isSuccess, isError, error }] = useDeleteCarsMutation(); 

    useEffect(() => {
        if (isError) {
            const errorResponse = error as ErrorResponse | SerializedError;

            const errorMessage =
                (errorResponse as ErrorResponse)?.data?.message ||
                "Something Went Wrong";

            toast.error(errorMessage);
        } else if (isSuccess) {
            toast.success("Car Deleted successfully");
        }
    }, [isError, isSuccess, error]);

    const handleDelete = async (id: string) => {
        await deleteCar(id);
    };

    return (
        <AlertDialog open={open} onOpenChange={onClose}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Car</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete the car &quot;
                        {car?.model}&quot;?
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(car?._id as string)}>
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteCarDialog;
