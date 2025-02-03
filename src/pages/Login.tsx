import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hook";
import { formValuesLogin } from "@/types";
import { verifyToken } from "@/utils/verifyToken";
import { SerializedError } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ErrorResponse, Link, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formValuesLogin>();
  const [loginUser, { isSuccess, isError, isLoading, error }] =
    useLoginMutation();

  useEffect(() => {
    if (isError) {
      const errorResponse = error as ErrorResponse | SerializedError;
      const errorMessage =
        (errorResponse as ErrorResponse)?.data?.message ||
        "Something Went Wrong";

      toast.error(errorMessage);
    } else if (isSuccess) {
      toast.success("User Logged In Successfully");
      navigate(from);
    }
  }, [error, from, isError, isSuccess, navigate]);

  const onSubmit: SubmitHandler<formValuesLogin> = async (
    data
  ) => {
    const res = await loginUser(data).unwrap();
    console.log(res);
    const user = verifyToken(res?.token) as TUser ;
    console.log(user);
    console.log(res?.token)
    dispatch(setUser({ user: user, token: res?.token }));
  };

  return (
    <div className="flex min-h-[100dvh] items-center justify-center flex-col bg-background">
      <div className="container mx-auto flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-8">
          <div>
           
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="email" className="sr-only">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                // autoComplete="email"
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
            <div className="relative">
              <Label htmlFor="password" className="sr-only">
                Password
              </Label>
              <Input
                id="password"
                autoComplete="current-password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                })}
              />

              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>
            </div>
            <div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing ... " : "Sign in"}
              </Button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-primary hover:text-primary/80"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
