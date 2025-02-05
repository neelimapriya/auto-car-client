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
      <div
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden ${
          sidebarOpen ? "block" : "hidden"
        }`}
      ></div>
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 flex flex-col bg-[#0c1427] min-h-screen transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? "translate-x-0 ease-out" : "-translate-x-full ease-in"
        }`}
      >
        <div className="flex items-center justify-center border-b border-gray-800 py-[18px]">
          <Link to="/dashboard">
            <img src={logo} alt="" className="w-14" />
          </Link>
        </div>
        <div className="overflow-y-auto custom-scroll">
          <nav className="mt-5 px-3">
            <ul>
              <h4 className="text-gray-400 font-semibold text-xs mb-1">Main</h4>
              <SideBarMenuItem
                menu={{
                  name: "Dashboard",
                  icon: "LayoutDashboard",
                  path: "/dashboard",
                }}
              />
              <SidebarSubMenu
                menu={{
                  name: "Cars",
                  icon: "Car",
                }}
                subMenu={[
                  {
                    name: "Create Car",
                    path: "/dashboard/create-cars",
                  },
                  {
                    name: "All Cars",
                    path: "/dashboard/allCars",
                  },
                ]}
              ></SidebarSubMenu>
              <SideBarMenuItem
                menu={{
                  name: "order",
                  icon: "ListMinus",
                  path: "/dashboard/orders",
                }}
              />

              <SideBarMenuItem
                menu={{
                  name: "Users",
                  icon: "Users",
                  path: "/dashboard/users",
                }}
              />
              <SideBarMenuItem
                menu={{
                  name: "Profile",
                  icon: "UserRoundPen",
                  path: "/dashboard/profile",
                }}
              />
              <SideBarMenuItem
                menu={{
                  name: "Back to Home",
                  icon: "House",
                  path: "/",
                }}
              />
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
