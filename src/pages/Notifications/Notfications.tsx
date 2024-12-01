import Sidebar from "@/components/menus/sidebar";
import { AlarmClockPlus, CalendarDays, MessageSquarePlus } from "lucide-react";
import { Outlet } from "react-router-dom";

const Notifications = () => {
  return (
    <div className="flex-grow h-{100vh} flex flex-row justify-between p-8 gap-8">
      <div className="flex-grow flex flex-col gap-8 h-full flex-grow-1 basis-0 overflow-auto">
        <Outlet />
      </div>
      <Sidebar
        paths={[
          {
            icon: CalendarDays,
            label: "Reminder",
            path: "./reminder",
          },
          {
            icon: AlarmClockPlus,
            label: "Alert",
            path: "./alert",
          },
          {
            icon: MessageSquarePlus,
            label: "Message",
            path: "./message",
          },
        ]}
      />
    </div>
  );
};

export default Notifications;
