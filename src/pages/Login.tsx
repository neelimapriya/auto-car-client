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
  const toastId= toast.loading('Logging in')
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
      toast.success("Logged in",{id:toastId, duration:2000})
      navigate(from);
    }
  }, [error, from, isError, isSuccess, navigate]);

  const onSubmit: SubmitHandler<formValuesLogin> = async (data) => {
    const res = await loginUser(data).unwrap();
    const user = verifyToken(res?.token) as TUser;
    dispatch(setUser({ user: user, token: res?.token }));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-black">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Welcome Back
        </h2>
        <p className="text-gray-500 text-center mb-6">
          Sign in to your account
        </p>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="text-black">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              })}
              className="mt-2"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="text-black">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
              className="mt-2"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <div>
            <Button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </div>
        </form>
        <div className="text-center mt-4">
          <p className="text-sm text-gray-500">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-red-600 hover:text-red-800"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
