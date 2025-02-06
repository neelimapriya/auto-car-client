import logo from "@/assets/image/logo-light.png";
import { Dispatch, FC, SetStateAction } from "react";
import { Link } from "react-router-dom";
import SideBarMenuItem from "./dashSidebarMenuItem";
import SidebarSubMenu from "./dashSidebarMenu";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
}

const Sidebar: FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  return (
    <>
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
        ></div>
      )}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 bg-[#0c1427] shadow-xl min-h-screen transition-transform duration-300 flex flex-col ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <Link to="/dashboard">
            <img src={logo} alt="Logo" className="w-16" />
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            ✖
          </button>
        </div>
        <nav className="mt-6 px-4 space-y-2">
          <SideBarMenuItem menu={{ name: "Dashboard", icon: "LayoutDashboard", path: "/dashboard" }} />
          <SidebarSubMenu
            menu={{ name: "Cars", icon: "Car" }}
            subMenu={[
              { name: "Create Car", path: "/dashboard/create-cars" },
              { name: "All Cars", path: "/dashboard/allCars" }
            ]}
          />
          <SideBarMenuItem menu={{ name: "Orders", icon: "ShoppingCart", path: "/dashboard/orders" }} />
          <SideBarMenuItem menu={{ name: "Users", icon: "Users", path: "/dashboard/manage-user" }} />
          <SideBarMenuItem menu={{ name: "Profile", icon: "UserRoundPen", path: "/profile" }} />
          <SideBarMenuItem menu={{ name: "Back to Home", icon: "House", path: "/" }} />
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
