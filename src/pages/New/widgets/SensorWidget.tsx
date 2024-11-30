import VariableForms from "@/components/Forms/VariableForms";
import { SearchInput } from "@/components/Inputs/SearchInput";
import StyledButton from "@/components/Inputs/StyledButton";
import Topbar from "@/components/menus/topbar";
import { Spinner } from "@/components/spinners/Spinner";
import { useToast } from "@/hooks/useToast";
import {
  useCreateSensorMutation,
  useLazyGetSensorsQuery,
  useUpdateSensorMutation,
} from "@/redux/apis/sensor";
import { useEffect, useState } from "react";

const SensorWidget = () => {
  const [getSensors, { data, isSuccess, isError, isFetching }] =
    useLazyGetSensorsQuery();
  const [
    createSensor,
    {
      isSuccess: createSuccess,
      isError: createError,
      isLoading: createFetching,
    },
  ] = useCreateSensorMutation();

  const [
    updateSensor,
    {
      isSuccess: updateSuccess,
      isError: updateError,
      isLoading: updateFetching,
    },
  ] = useUpdateSensorMutation();

  const { toast, removeToast } = useToast();
  const [addNew, setAddNew] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getSensors();
  }, []);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "Failed to fetch Sensors",
        variant: "error",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (createError) {
      toast({
        title: "Error",
        description: "Failed to create Sensor",
        variant: "error",
      });
    }
  }, [createError]);

  useEffect(() => {
    if (createSuccess) {
      toast({
        title: "Success",
        description: "Sensor created successfully",
        variant: "success",
      });
      getSensors();
      setAddNew(false);
    }
  }, [createSuccess]);

  useEffect(() => {
    if (createFetching) {
      toast({
        id: "create-Sensor",
        title: "Loading",
        description: "Creating Sensor",
        variant: "loading",
      });
    } else {
      removeToast("create-Sensor");
    }
  }, [createFetching]);

  useEffect(() => {
    if (updateError) {
      toast({
        title: "Error",
        description: "Failed to update Sensor",
        variant: "error",
      });
    }
  }, [updateError]);

  useEffect(() => {
    if (updateSuccess) {
      toast({
        title: "Success",
        description: "Sensor updated successfully",
        variant: "success",
      });
      getSensors();
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateFetching) {
      toast({
        id: "update-Sensor",
        title: "Loading",
        description: "Updating Sensor",
        variant: "loading",
      });
    } else {
      removeToast("update-Sensor");
    }
  }, [updateFetching]);

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

  const handleAddNew = (name: string, description: string, id: number) => {
    createSensor({ name, description, id });
  };

  const handleUpdate = (name: string, description: string, id: number) => {
    updateSensor({ name, description, id });
  };

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
              <StyledButton onClick={() => getSensors()} variant="text">
                Refresh
              </StyledButton>
            </>
          }
          rightChildren={<h1 className="text-zinc-100 text-lg">Sensors</h1>}
        />
        <div className="w-full p-4 bg-zinc-950/50 rounded-xl flex-grow min-h-0 basis-0 overflow-hidden">
          <div className="flex flex-col gap-4 overflow-auto h-full scrollbar-thumb-zinc-700 scrollbar-track-transparent pr-4">
            {addNew && (
              <div className="p-4 bg-zinc-900 rounded-xl flex flex-col gap-2">
                <VariableForms
                  id={0}
                  name=""
                  description=""
                  isNew={true}
                  handleSubmission={handleAddNew}
                />
              </div>
            )}
            {data
              .filter((sen) => {
                if (search === "") return true;
                return sen.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((sen) => (
                <div
                  key={sen.id}
                  className="p-4 bg-zinc-900 rounded-xl flex flex-col gap-2"
                >
                  <VariableForms {...sen} handleSubmission={handleUpdate} />
                </div>
              ))}
          </div>
        </div>
      </>
    )
  );
};

export default SensorWidget;
