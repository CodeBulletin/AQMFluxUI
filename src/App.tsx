import "./App.css";
import Sidemenu from "./components/menus/sidemenu";
import { Route, Routes } from "react-router-dom";
import Config from "./pages/Config/Config";
import LoginForm from "./pages/Login/Login";
import Add from "./pages/Add/Add";
import VariablesWidget from "./pages/Add/widgets/VariableWidget";
import LocationWidget from "./pages/Add/widgets/LocationWidget";
import DeviceWidget from "./pages/Add/widgets/DeviceWidget";
import SensorWidget from "./pages/Add/widgets/SensorWidget";

function App() {
  return (
    <div className="bg-zinc-900 text-zinc-100 flex w-{100vw} h-{100vh}">
      <Sidemenu />
      <Routes>
        <Route path="/settings" element={<Config />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/add" element={<Add />}>
          <Route path="variables" element={<VariablesWidget />} />
          <Route path="locations" element={<LocationWidget />} />
          <Route path="sensors" element={<SensorWidget />} />
          <Route path="devices" element={<DeviceWidget />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
