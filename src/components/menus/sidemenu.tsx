import React, { useEffect } from "react";
import {
  Home,
  Settings,
  BarChart,
  PlusSquare,
  Webhook,
  BellDot,
  MonitorCog,
} from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useLocation, useNavigate } from "react-router-dom";
import NavItem from "./navitem";

const Sidemenu = () => {
  const [active, setActive] = React.useState<string | null>("home");

  const navigate = useNavigate();
  const location = useLocation();

  const mainMenuItems = [
    { id: "home", icon: Home, label: "Home", path: "/" },
    { id: "analytics", icon: BarChart, label: "Analytics", path: "/analytics" },
    { id: "settings", icon: MonitorCog, label: "Users", path: "/settings" },
    { id: "new", icon: PlusSquare, label: "New", path: "/New" },
    {
      id: "notification",
      icon: BellDot,
      label: "Notifications",
      path: "/Notfications",
    },
  ];

  const bottomMenuItems = [
    { id: "config", icon: Settings, label: "Settings", path: "/config" },
  ];

  const handleNavigation = (id: any, path: any) => {
    setActive(id);
    navigate(path);
  };

  useEffect(() => {
    let path = "/" + location.pathname.split("/")[1];
    console.log(path);
    const activeItem = mainMenuItems.find((item) => item.path === path);
    if (activeItem) {
      setActive(activeItem.id);
      return;
    }

    const bottomItem = bottomMenuItems.find((item) => item.path === path);

    if (bottomItem) {
      setActive(bottomItem.id);
      return;
    }

    setActive(null);
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
