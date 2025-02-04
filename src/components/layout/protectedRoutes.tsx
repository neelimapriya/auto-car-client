import { logout, useCurrentToken } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";

type TProtectedRoute = {
  children: ReactNode;
  role: string | undefined;
};

const ProtectedRoute = ({ children, role }: TProtectedRoute) => {
  const token = useAppSelector(useCurrentToken);
  const location = useLocation();

  let user;

  if (token) {
    user = verifyToken(token);
  }

  const dispatch = useAppDispatch();

  if (role !== undefined && role !== user?.role) {
    dispatch(logout());
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
