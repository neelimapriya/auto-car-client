import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useGetMeQuery } from "@/redux/features/users/userApi";

interface DashNavbarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const DashNavbar: FC<DashNavbarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const token = useAppSelector((state) => state.auth.token);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: userData, isLoading, refetch } = useGetMeQuery("");

  useEffect(() => {
    if (token) {
      refetch();
    }
  }, [token, refetch]);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    dispatch(logout());
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <div className="flex relative items-center justify-between px-6 py-3 dark:bg-[#0c1427] border dark:border-slate-800">
      <div className="flex items-center">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-gray-500 focus:outline-none lg:hidden"
        >
          <svg
            className="w-6 h-6"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 6H20M4 12H20M4 18H11"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="relative mx-4 lg:mx-0">
          <h2 className="uppercase text-red-700 font-bold">
            {" "}
            Welcome to Auto Car DashBoard
          </h2>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <div className="flex items-center">
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="relative block w-10 h-10 overflow-hidden rounded-full shadow focus:outline-none"
            >
              {isLoading ? (
                <div className="flex items-center space-x-4">
                  <Skeleton className="size-10 rounded-full" />
                </div>
              ) : (
                <Avatar>
                  <AvatarImage src={userData?.avatar} alt={userData?.name} />

                  <AvatarFallback>{userData?.name.split("")[0]}</AvatarFallback>
                </Avatar>
              )}
            </button>

            <div
              onClick={() => setDropdownOpen(false)}
              className={`fixed inset-0 z-10 w-full h-full ${
                dropdownOpen ? "" : "hidden"
              }`}
            ></div>

            <div
              className={`absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white dark:bg-muted rounded-md shadow-xl ${
                dropdownOpen ? "" : "hidden"
              }`}
            >
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm hover:bg-primary hover:text-white"
              >
                Profile
              </Link>
              <div
                onClick={handleLogout}
                className="block px-4 cursor-pointer py-2 text-sm hover:bg-primary hover:text-white"
              >
                Logout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashNavbar;
