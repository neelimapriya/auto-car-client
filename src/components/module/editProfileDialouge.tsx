import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUpdateProfileMutation } from "@/redux/features/users/userApi";
import { ErrorResponse, TUserData } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface EditProfileDialogProps {
  user: TUserData | null;
  open: boolean;
  onClose: () => void;
}
const EditProfile = ({ user, open, onClose }: EditProfileDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TUserData>({
    defaultValues: user || {
      name: "",
      email: "",
      password: "",
      role: "user",
    },
  });

  const [updateProfile, { isSuccess, isError, error }] =
    useUpdateProfileMutation();

  useEffect(() => {
    if (isError) {
      const errorResponse = error as ErrorResponse | SerializedError;

      const errorMessage =
        (errorResponse as ErrorResponse)?.data?.message ||
        "Something Went Wrong";

      toast.error(errorMessage);
    } else if (isSuccess) {
      toast.success("User Successfully Updated");
      reset();
    }
  }, [isError, isSuccess, error, reset]);

  useEffect(() => {
    reset(
      user || {
        name: "",
        email: "",
        password: "",
        role: "user",
      }
    );
  }, [user, reset]);

  const onSubmit = async (data: TUserData) => {
    const loadingToast = toast.loading("Profile is Updating...");

    if (user) {
      await updateProfile(data);
    }
    onClose();
    toast.dismiss(loadingToast);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent aria-describedby={undefined} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4"
        >
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="Full name"
              {...register("name")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="Email address"
              {...register("email", {
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="new-password"
              placeholder="Password"
              {...register("password", {
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <DialogFooter className="col-span-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
