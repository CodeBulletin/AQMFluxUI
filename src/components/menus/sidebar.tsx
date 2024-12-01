import React, { useEffect } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import NavItem from "./navitem";

export type SidebarProps = {
  pathDepth?: number;
  defaultPath?: number;
  paths?: {
    icon: any;
    label: string;
    path: string;
  }[];
};

const Sidebar = ({ pathDepth = 2, defaultPath = 0, paths }: SidebarProps) => {
  const [path, setPath] = React.useState(
    paths?.[defaultPath].path.split("/")[1] || ""
  );
  const [activePath, setActivePath] = React.useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setActivePath(location.pathname.split("/")[pathDepth]);
  }, [location]);

  useEffect(() => {
    if (path !== "") {
      navigate(path);
    }
  }, [path]);

  const handleNavigation = (path: string) => {
    setPath(path);
  };

  return (
    <div className="bg-zinc-950 rounded-xl flex flex-col items-center space-y-2 py-4 h-full w-16">
      <TooltipProvider>
        {paths?.map((item) => (
          <NavItem
            key={item.path}
            activepath={activePath}
            Icon={item.icon}
            label={item.label}
            path={item.path.split("/")[1]}
            handleNavigation={() => handleNavigation(item.path)}
          />
        ))}
      </TooltipProvider>
    </div>
  );
};

export default Sidebar;
