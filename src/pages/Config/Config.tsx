import InfoWidget from "./Widgets/InfoWidget";
import LocationWidget from "./Widgets/LocationWidget";
import CmdWidget from "./Widgets/CmdWidget";
import KeyWidget from "./Widgets/KeyWidget";

const Config = () => {
  return (
    <div className="flex flex-grow gap-8">
      <div className="flex flex-col flex-grow gap-8">
        <LocationWidget />
        <CmdWidget />
      </div>

      <div className="flex flex-col flex-grow gap-8">
        <KeyWidget />
        <InfoWidget />
      </div>
    </div>
  );
};

export default Config;
