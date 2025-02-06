import logoDark from "@/assets/image/logo-light.png";
import { LucideMenu, User2, X } from "lucide-react";
import { FC, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { useTheme } from "../theme-provider";
import { ModeToggle } from "../mode-toggle";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const Navbar: FC = () => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role;

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsDropdownOpen(false);
    toast.success("Logout Successfully");
    navigate("/");
  };

  return (
    <header className="relative py-6 px-8">
      <div
        className={`container mx-auto flex justify-between items-center ${
          theme === "dark"
            ? "bg-gradient-to-r from-gray-800 via-gray-900 to-black"
            : "bg-gradient-to-r from-gray-700 via-rose-500 to-red-700"
        } rounded-lg`}
      >
        <Link to="/" onClick={() => setIsOpen(false)}>
          <img src={logoDark} alt="logo" className="w-36" />
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          <NavLink to="/" className={({ isActive }) => (isActive ? "text-white font-semibold" : "text-gray-200")}>
            Home
          </NavLink>
          <NavLink to="/cars" className={({ isActive }) => (isActive ? "text-white font-semibold" : "text-gray-200")}>
            Cars
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-white font-semibold" : "text-gray-200")}>
            About Us
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-white font-semibold" : "text-gray-200")}>
            Contact Us
          </NavLink>

          {token ? (
            <div className="relative z-10">
              <button onClick={handleDropdownToggle} className="flex items-center text-gray-200 hover:text-white">
                <User2 size={25} />
              </button>

              {isDropdownOpen && (
                <div className="absolute top-8 right-0 bg-white p-4 rounded-lg shadow-lg w-48 z-20">
                  {role === "admin" ? (
                    <>
                      <NavLink to="/dashboard" className="block text-gray-700 hover:text-red-700 py-2" onClick={() => setIsDropdownOpen(false)}>
                        Dashboard
                      </NavLink>
                    </>
                  ) : (
                    <>
                      <NavLink to="/profile" className="block text-gray-700 hover:text-red-700 py-2" onClick={() => setIsDropdownOpen(false)}>
                        Profile
                      </NavLink>
                      <NavLink to={`/my-orders/${user?.email}`} className="block text-gray-700 hover:text-red-700 py-2" onClick={() => setIsDropdownOpen(false)}>
                        My Orders
                      </NavLink>
                    </>
                  )}

                  <button onClick={handleLogout} className="w-full text-red-500 hover:text-black py-2 text-left">
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Button asChild variant="outline" className="text-black dark:text-white border-white">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild variant="outline" className="text-black dark:text-white border-white">
                <Link to="/register">Register</Link>
              </Button>
            </>
          )}

          <ModeToggle />
        </div>

        <button onClick={() => setIsOpen(true)} className="md:hidden text-white">
          <LucideMenu size={30} />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50">
          <div className="absolute top-0 right-0 bg-white w-4/5 h-full shadow-lg p-8 z-50">
            <button onClick={() => setIsOpen(false)} className="text-2xl text-gray-700 absolute top-4 right-4">
              <X size={30} />
            </button>
            <ul className="flex flex-col gap-8 items-center mt-20">
              <li>
                <NavLink to="/" className={({ isActive }) => (isActive ? "text-red-700" : "text-gray-700")} onClick={() => setIsOpen(false)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/cars" className={({ isActive }) => (isActive ? "text-red-700" : "text-gray-700")} onClick={() => setIsOpen(false)}>
                  Cars
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" className={({ isActive }) => (isActive ? "text-red-700" : "text-gray-700")} onClick={() => setIsOpen(false)}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-red-700" : "text-gray-700")} onClick={() => setIsOpen(false)}>
                  Contact Us
                </NavLink>
              </li>

              {token ? (
                <div className="relative z-10">
                  <button onClick={handleDropdownToggle} className="flex items-center text-gray-700">
                    <User2 size={25} />
                  </button>

                  {isDropdownOpen && (
                    <div className="absolute top-8 right-0 bg-white p-4 rounded-lg shadow-lg w-48 z-20">
                      {role === "admin" ? (
                        <>
                          <NavLink to="/dashboard" className="block text-gray-700 hover:text-red-700 py-2" onClick={() => setIsDropdownOpen(false)}>
                            Dashboard
                          </NavLink>
                        </>
                      ) : (
                        <>
                          <NavLink to="/profile" className="block text-gray-700 hover:text-red-700 py-2" onClick={() => setIsDropdownOpen(false)}>
                            Profile
                          </NavLink>
                          <NavLink to={`/my-orders/${user?.email}`} className="block text-gray-700 hover:text-red-700 py-2" onClick={() => setIsDropdownOpen(false)}>
                        My Orders
                      </NavLink>
                        </>
                      )}

                      <button onClick={handleLogout} className="w-full text-red-500 hover:text-black py-2 text-left">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Button asChild variant="outline" className="text-red-700 border-white">
                    <Link to="/login">Login</Link>
                  </Button>
                  <Button asChild variant="outline" className="text-red-700 border-white">
                    <Link to="/register">Register</Link>
                  </Button>
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
