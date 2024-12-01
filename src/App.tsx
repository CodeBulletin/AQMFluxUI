import "./App.css";
import Sidemenu from "./components/menus/sidemenu";
import { Route, Routes } from "react-router-dom";
import Config from "./pages/Config/Config";
import LoginForm from "./pages/Login/Login";
import New from "./pages/New/New";
import Notification from "./pages/Notifications/Notfications";
import VariablesWidget from "./pages/New/widgets/VariableWidget";
import LocationWidget from "./pages/New/widgets/LocationWidget";
import DeviceWidget from "./pages/New/widgets/DeviceWidget";
import SensorWidget from "./pages/New/widgets/SensorWidget";
import MessageWidget from "./pages/Notifications/widgets/MessageWidget";
import AlertWidget from "./pages/Notifications/widgets/AlertWidget";
import NotImplemented from "./components/panels/NotImplemented";
import NotFound from "./components/panels/NotFound";

function App() {
  return (
    <div className="bg-zinc-900 text-zinc-100 flex w-{100vw} h-{100vh}">
      <Sidemenu />
      <Routes>
        <Route path="/config" element={<Config />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/New" element={<New />}>
          <Route path="variables" element={<VariablesWidget />} />
          <Route path="locations" element={<LocationWidget />} />
          <Route path="sensors" element={<SensorWidget />} />
          <Route path="devices" element={<DeviceWidget />} />
        </Route>
        <Route path="/Notfications" element={<Notification />}>
          <Route path="reminder" element={<NotImplemented />} />
          <Route path="alert" element={<AlertWidget />} />
          <Route path="message" element={<MessageWidget />} />
        </Route>
        <Route path="/settings" element={<NotImplemented />} />
        <Route path="/analytics" element={<NotImplemented />} />
        <Route path="/" element={<NotImplemented />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
