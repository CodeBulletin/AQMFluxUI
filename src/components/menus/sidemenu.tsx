import React, { useEffect } from "react";
import {
  Home,
  Users,
  Settings,
  BarChart,
  PlusSquare,
  Webhook,
  BellDot,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import NavItem from "./navitem";

const Sidemenu = () => {
  const [active, setActive] = React.useState("home");

  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "analytics", icon: BarChart, label: "Analytics", path: "/analytics" },
    { id: "users", icon: Users, label: "Users", path: "/users" },
    { id: "new", icon: PlusSquare, label: "New", path: "/New" },
    {
      id: "notification",
      icon: BellDot,
      label: "Notifications",
      path: "/Notfications",
    },
  ];

  const bottomMenuItems = [
    { id: "settings", icon: Settings, label: "Settings", path: "/settings" },
  ];

  const handleNavigation = (id: any, path: any) => {
    setActive(id);
    navigate(path);
  };

  useEffect(() => {
    const activeItem = mainMenuItems.find(
      (item) => item.path === location.pathname
    );
    if (activeItem) {
      setActive(activeItem.id);
    }

    const bottomItem = bottomMenuItems.find(
      (item) => item.path === location.pathname
    );

    if (bottomItem) {
      setActive(bottomItem.id);
    }
  }, [location.pathname]);

  return (
    <div className="h-screen w-16 bg-zinc-950 flex flex-col items-center py-4 border-r border-zinc-800">
      {/* Company Logo */}
      <div className="mb-4">
        <div className="w-10 h-10 bg-zinc-100 rounded-md flex items-center justify-center">
          <Webhook className="h-6 w-6 text-zinc-900" />
        </div>
      </div>

      {/* Separator */}
      <div className="w-8 h-px bg-zinc-800 mb-4" />

      {/* Main Navigation Items */}
      <TooltipProvider>
        <nav className="flex-1 flex flex-col gap-2">
          {mainMenuItems.map((item) => (
            <NavItem
              key={item.id}
              activepath={active}
              path={item.id}
              handleNavigation={() => handleNavigation(item.id, item.path)}
              Icon={item.icon}
              label={item.label}
            />
          ))}
        </nav>

        {/* Bottom Navigation Items */}
        <nav className="pt-2 border-t border-zinc-800 w-full flex justify-center">
          {bottomMenuItems.map((item) => (
            <NavItem
              key={item.id}
              activepath={active}
              path={item.id}
              handleNavigation={() => handleNavigation(item.id, item.path)}
              Icon={item.icon}
              label={item.label}
            />
          ))}
        </nav>
      </TooltipProvider>
    </div>
  );
};

export default Sidemenu;
