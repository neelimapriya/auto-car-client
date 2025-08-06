import logoDark from "@/assets/image/logo-light.png";
import { LucideMenu, User2, X, ChevronDown, LogOut, User, Settings, ShoppingBag } from "lucide-react";
import { FC, useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { ModeToggle } from "../mode-toggle";
import { logout } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  const user = useAppSelector((state) => state.auth.user);
  const role = user?.role;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/20 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-black/95 dark:supports-[backdrop-filter]:bg-black/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={() => setIsOpen(false)} className="flex items-center space-x-2">
            <img src={logoDark} alt="logo" className="h-8 w-auto" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `relative px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-red-600 dark:hover:text-red-400 ${
                  isActive 
                    ? "text-red-600 dark:text-red-400" 
                    : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/cars" 
              className={({ isActive }) => 
                `relative px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-red-600 dark:hover:text-red-400 ${
                  isActive 
                    ? "text-red-600 dark:text-red-400" 
                    : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              Cars
            </NavLink>
            <NavLink 
              to="/about" 
              className={({ isActive }) => 
                `relative px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-red-600 dark:hover:text-red-400 ${
                  isActive 
                    ? "text-red-600 dark:text-red-400" 
                    : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              About Us
            </NavLink>
            <NavLink 
              to="/contact" 
              className={({ isActive }) => 
                `relative px-3 py-2 text-sm font-medium transition-colors duration-200 hover:text-red-600 dark:hover:text-red-400 ${
                  isActive 
                    ? "text-red-600 dark:text-red-400" 
                    : "text-gray-700 dark:text-gray-300"
                }`
              }
            >
              Contact Us
            </NavLink>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <ModeToggle />
            
            {token ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={handleDropdownToggle} 
                  className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 transition-colors duration-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <User2 size={20} />
                  <span className="hidden lg:block">{user?.name || 'User'}</span>
                  <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-md border border-gray-200 bg-white py-2 shadow-lg dark:border-gray-800 dark:bg-black/80">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{user?.email}</p>
                    </div>
                    
                    {role === "admin" ? (
                      <NavLink 
                        to="/dashboard" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-black/60 dark:hover:text-red-400 transition-colors duration-200" 
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <Settings size={16} className="mr-3" />
                        Dashboard
                      </NavLink>
                    ) : (
                      <>
                        <NavLink 
                          to="/profile" 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-black/60 dark:hover:text-red-400 transition-colors duration-200" 
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <User size={16} className="mr-3" />
                          Profile
                        </NavLink>
                        <NavLink 
                          to={`/my-orders/${user?.email}`} 
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-black/60 dark:hover:text-red-400 transition-colors duration-200" 
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <ShoppingBag size={16} className="mr-3" />
                          My Orders
                        </NavLink>
                      </>
                    )}

                    <div className="border-t border-gray-100 dark:border-gray-700">
                      <button 
                        onClick={handleLogout} 
                        className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300 transition-colors duration-200"
                      >
                        <LogOut size={16} className="mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button asChild variant="ghost" size="sm">
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link to="/register">Register</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(true)} 
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-black/60 dark:hover:text-red-400 transition-colors duration-200"
          >
            <LucideMenu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white dark:bg-black shadow-xl">
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <img src={logoDark} alt="logo" className="h-8 w-auto" />
                </Link>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-black/60 dark:hover:text-red-400 transition-colors duration-200"
                >
                  <X size={24} />
                </button>
              </div>

                             <div className="flex-1 px-6 py-8">
                 <nav className="space-y-6 bg-gray-50 dark:bg-black p-6 rounded-lg">
                   <NavLink 
                     to="/" 
                     className={({ isActive }) => 
                       `block text-lg font-medium transition-colors duration-200 hover:text-red-600 dark:hover:text-red-400 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-black/60 ${
                         isActive 
                           ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20" 
                           : "text-gray-700 dark:text-gray-300"
                       }`
                     } 
                     onClick={() => setIsOpen(false)}
                   >
                     Home
                   </NavLink>
                   <NavLink 
                     to="/cars" 
                     className={({ isActive }) => 
                       `block text-lg font-medium transition-colors duration-200 hover:text-red-600 dark:hover:text-red-400 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-black/60 ${
                         isActive 
                           ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20" 
                           : "text-gray-700 dark:text-gray-300"
                       }`
                     } 
                     onClick={() => setIsOpen(false)}
                   >
                     Cars
                   </NavLink>
                   <NavLink 
                     to="/about" 
                     className={({ isActive }) => 
                       `block text-lg font-medium transition-colors duration-200 hover:text-red-600 dark:hover:text-red-400 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-black/60 ${
                         isActive 
                           ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20" 
                           : "text-gray-700 dark:text-gray-300"
                       }`
                     } 
                     onClick={() => setIsOpen(false)}
                   >
                     About Us
                   </NavLink>
                   <NavLink 
                     to="/contact" 
                     className={({ isActive }) => 
                       `block text-lg font-medium transition-colors duration-200 hover:text-red-600 dark:hover:text-red-400 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-black/60 ${
                         isActive 
                           ? "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20" 
                           : "text-gray-700 dark:text-gray-300"
                       }`
                     } 
                     onClick={() => setIsOpen(false)}
                   >
                     Contact Us
                   </NavLink>
                   <ModeToggle />
                 </nav>

                <div className="mt-8 space-y-4">
                  
                  
                  {token ? (
                                         <div className="space-y-2 bg-white dark:bg-black">
                       <div className="px-4 py-2 bg-gray-50 dark:bg-black rounded-lg">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
                        <p className="text-xs text-gray-900 dark:text-gray-400">{user?.email}</p>
                      </div>
                      
                      {role === "admin" ? (
                        <NavLink 
                          to="/dashboard" 
                          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-black/60 dark:hover:text-red-400 transition-colors duration-200 rounded-lg" 
                          onClick={() => setIsOpen(false)}
                        >
                          <Settings size={20} className="mr-3" />
                          Dashboard
                        </NavLink>
                      ) : (
                        <>
                          <NavLink 
                            to="/profile" 
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-black/60 dark:hover:text-red-400 transition-colors duration-200 rounded-lg" 
                            onClick={() => setIsOpen(false)}
                          >
                            <User size={20} className="mr-3" />
                            Profile
                          </NavLink>
                          <NavLink 
                            to={`/my-orders/${user?.email}`} 
                            className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 hover:text-red-600 dark:text-gray-300 dark:hover:bg-black/60 dark:hover:text-red-400 transition-colors duration-200 rounded-lg" 
                            onClick={() => setIsOpen(false)}
                          >
                            <ShoppingBag size={20} className="mr-3" />
                            My Orders
                          </NavLink>
                        </>
                      )}
                      
                      <button 
                        onClick={handleLogout} 
                        className="flex w-full items-center px-4 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300 transition-colors duration-200 rounded-lg"
                      >
                        <LogOut size={20} className="mr-3" />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Button asChild variant="outline" className="w-full">
                        <Link to="/login">Login</Link>
                      </Button>
                      <Button asChild className="w-full">
                        <Link to="/register">Register</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
