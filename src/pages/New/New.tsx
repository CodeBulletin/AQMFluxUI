import Sidebar from "@/components/menus/sidebar";
import { Locate, MonitorSmartphone, Pin, Variable } from "lucide-react";
import { Outlet } from "react-router-dom";

const New = () => {
  return (
    <div className="flex-grow h-{100vh} flex flex-row justify-between p-8 gap-8">
      <div className="flex-grow flex flex-col gap-8 h-full flex-grow-1 basis-0 overflow-auto">
        <Outlet />
      </div>
      <Sidebar
        paths={[
          {
            icon: Variable,
            label: "Variables",
            path: "./variables",
          },
          {
            icon: Locate,
            label: "Location",
            path: "./locations",
          },
          {
            icon: Pin,
            label: "Sensors",
            path: "./sensors",
          },
          {
            icon: MonitorSmartphone,
            label: "Devices",
            path: "./devices",
          },
        ]}
      />
    </div>
  );
};

export default New;
