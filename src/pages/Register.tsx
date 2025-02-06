import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRegisterUserMutation } from "@/redux/features/auth/authApi";
import { formValues } from "@/types";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorResponse, Link, useNavigate } from "react-router";
import { toast } from "sonner";

const Register = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<formValues>();
  const [createUser, { isSuccess, isLoading, isError, error }] =
    useRegisterUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      const errorResponse = error as ErrorResponse | SerializedError;
      const errorMessage =
        (errorResponse as ErrorResponse)?.data?.message ||
        "Something Went Wrong";

      toast.error(errorMessage);
    } else if (isSuccess) {
      toast.success("User Registration In Successfully",{duration:2000});
      navigate("/login");
    }
  }, [error, isError, isSuccess, navigate]);

  const onSubmit: SubmitHandler<formValues> = (data) => {
    createUser(data);
  };

  // const password = watch("password");

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div className="">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight  text-black">
              Register for Auto Car
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Create an account to order cars
            </p>
          </div>
          <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
            <div className="text-black">
              <Label htmlFor="name" className="sr-only">
                Name
              </Label>
              <Input
                id="name"
                type="text"
                autoComplete="name"
                placeholder="Full name"
                {...register("name", {
                  required: "Name is required",
                })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="text-black">
              <Label htmlFor="email" className="sr-only">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="Email address"
                {...register("email", {
                  required: "Email is required",
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
            <div className="text-black">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
           
              <Button type="submit" className="w-full mt-5" disabled={isLoading}>
                {isLoading ? "Processing ... " : "Sign Up"}
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary hover:text-primary/80"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
