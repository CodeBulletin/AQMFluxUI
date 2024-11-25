import DeviceForm, {
  DeviceFormSubmitProps,
} from "@/components/Forms/DeviceForm";
import { SearchInput } from "@/components/Inputs/SearchInput";
import StyledButton from "@/components/Inputs/StyledButton";
import Topbar from "@/components/menus/topbar";
import { Spinner } from "@/components/spinners/Spinner";
import { useToast } from "@/hooks/useToast";
import {
  useCreateDeviceMutation,
  useLazyGetDevicesQuery,
} from "@/redux/apis/device";
import { useLazyGetLocationsQuery } from "@/redux/apis/location";
import { useLazyGetSensorsQuery } from "@/redux/apis/sensor";
import { useEffect, useState } from "react";

const DeviceWidget = () => {
  const [addNew, setAddNew] = useState(false);
  const [search, setSearch] = useState("");
  const { toast } = useToast();
  const [getSensors, { data: sensors, isSuccess: sensorSuccess }] =
    useLazyGetSensorsQuery();
  const [getLocations, { data: locations, isSuccess: locationSuccess }] =
    useLazyGetLocationsQuery();
  const [
    createDevice,
    {
      isSuccess: deviceSuccess,
      isError: deviceError,
      isLoading: deviceLoading,
    },
  ] = useCreateDeviceMutation();

  const [getDevices, { data, isSuccess, isFetching }] =
    useLazyGetDevicesQuery();

  useEffect(() => {
    getSensors();
    getLocations();
    getDevices();
  }, []);

  useEffect(() => {
    if (deviceSuccess) {
      toast({
        title: "Device Created",
        description: "The device was created successfully",
        variant: "success",
      });
    }
  }, [deviceSuccess]);

  useEffect(() => {
    if (deviceError) {
      toast({
        title: "Device Creation Failed",
        description: "The device was not created",
        variant: "error",
      });
    }
  }, [deviceError]);

  useEffect(() => {
    if (deviceLoading) {
      toast({
        title: "Creating Device",
        description: "The device is being created",
        variant: "loading",
      });
    }
  }, [deviceLoading]);

  const handleSave = (data: DeviceFormSubmitProps) => {
    createDevice({
      id: data.id,
      name: data.name,
      description: data.description,
      location: data.locations,
      sensors: data.sensors,
      ip_address: data.ipAddress,
      mac_address: data.macAddress,
      port: data.port,
    });
  };

  const refresh = () => {
    getSensors();
    getLocations();
    getDevices();
  };

  if (isFetching) {
    return (
      <>
        <Topbar
          centerChildren={
            <div className="flex items-center gap-2">
              <Spinner />
            </div>
          }
        />
        <div className="w-full p-4 bg-zinc-800/50 rounded-xl flex-grow min-h-0 basis-0 overflow-hidden">
          <Spinner />
        </div>
      </>
    );
  }

  return (
    isSuccess && (
      <>
        <Topbar
          centerChildren={<SearchInput setValue={setSearch} value={search} />}
          leftChildren={
            <>
              <StyledButton onClick={() => setAddNew(!addNew)}>
                {addNew ? "Cancel" : "Add New"}
              </StyledButton>
              <StyledButton onClick={() => refresh()} variant="text">
                Refresh
              </StyledButton>
            </>
          }
          rightChildren={<h1 className="text-zinc-100 text-lg">Devices</h1>}
        />
        <div className="w-full p-4 bg-zinc-950/50 rounded-xl flex-grow min-h-0 basis-0 overflow-hidden">
          <div className="flex flex-col gap-4 overflow-auto h-full scrollbar-thumb-zinc-700 scrollbar-track-transparent pr-4">
            {addNew && (
              <div className="p-4 bg-zinc-900 rounded-xl flex flex-col gap-2">
                <DeviceForm
                  id={0}
                  name=""
                  description=""
                  isNew={true}
                  locations={locationSuccess ? locations : []}
                  selectedLocation={1}
                  sensors={sensorSuccess ? sensors : []}
                  selectedSensors={[]}
                  ipAddress=""
                  macAddress=""
                  port={0}
                  handleSubmission={handleSave}
                />
              </div>
            )}
            {data &&
              data
                .filter((device) =>
                  device.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((device) => (
                  <div
                    key={device.id}
                    className="p-4 bg-zinc-900 rounded-xl flex flex-col gap-2"
                  >
                    <DeviceForm
                      id={device.id}
                      name={device.name}
                      description={device.description}
                      isNew={false}
                      locations={locationSuccess ? locations : []}
                      selectedLocation={device.location}
                      sensors={sensorSuccess ? sensors : []}
                      selectedSensors={device.sensors}
                      ipAddress={device.ip_address}
                      macAddress={device.mac_address}
                      port={device.port}
                      handleSubmission={handleSave}
                    />
                  </div>
                ))}
          </div>
        </div>
      </>
    )
  );
};

export default DeviceWidget;
