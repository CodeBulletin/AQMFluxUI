import AlertForm, {
  AlertFormSubmitNewProps,
} from "@/components/Forms/AlertForm";
import { SearchInput } from "@/components/Inputs/SearchInput";
import StyledButton from "@/components/Inputs/StyledButton";
import Topbar from "@/components/menus/topbar";
import { useToast } from "@/hooks/useToast";
import { useCreateAlertMutation } from "@/redux/apis/alert";
import { useLazyGetAttributeListQuery } from "@/redux/apis/attribute";
import { useLazyGetDeviceListQuery } from "@/redux/apis/device";
import { useLazyGetMessagesQuery } from "@/redux/apis/message";
import { useLazyGetOperatorsQuery } from "@/redux/apis/operator";
import { useLazyGetSensorsListQuery } from "@/redux/apis/sensor";
import { useEffect, useState } from "react";

const AlertWidget = () => {
  const [addNew, setAddNew] = useState(false);
  const [search, setSearch] = useState("");
  const { toast } = useToast();

  const [
    getDevicesList,
    { data: devicesData, error: devicesError, isSuccess: deviceSuccess },
  ] = useLazyGetDeviceListQuery();
  const [
    getSensorList,
    { data: sensorsData, error: sensorsError, isSuccess: sensorsSuccess },
  ] = useLazyGetSensorsListQuery();
  const [
    getAttributeList,
    { data: attributeData, error: attributeError, isSuccess: attributeSuccess },
  ] = useLazyGetAttributeListQuery();
  const [
    getMessageList,
    { data: messagesData, error: messagesError, isSuccess: messagesSuccess },
  ] = useLazyGetMessagesQuery();
  const [
    getOperatorList,
    { data: operatorsData, error: operatorsError, isSuccess: operatorsSuccess },
  ] = useLazyGetOperatorsQuery();

  const [
    createAlert,
    { isSuccess: alertSuccess, isError: alertError, isLoading: alertLoading },
  ] = useCreateAlertMutation();

  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    if (devicesError) {
      setIsSuccess(false);
      toast({
        title: "Error",
        description: "Failed to fetch devices",
        variant: "error",
      });
    }
  }, [devicesError]);

  useEffect(() => {
    if (sensorsError) {
      setIsSuccess(false);
      toast({
        title: "Error",
        description: "Failed to fetch sensors",
        variant: "error",
      });
    }
  }, [sensorsError]);

  useEffect(() => {
    if (attributeError) {
      setIsSuccess(false);
      toast({
        title: "Error",
        description: "Failed to fetch attributes",
        variant: "error",
      });
    }
  }, [attributeError]);

  useEffect(() => {
    if (messagesError) {
      setIsSuccess(false);
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "error",
      });
    }
  }, [messagesError]);

  useEffect(() => {
    if (operatorsError) {
      setIsSuccess(false);
      toast({
        title: "Error",
        description: "Failed to fetch operators",
        variant: "error",
      });
    }
  }, [operatorsError]);

  useEffect(() => {
    if (alertError) {
      setIsSuccess(false);
      toast({
        title: "Error",
        description: "Failed to create alert",
        variant: "error",
      });
    }
  }, [alertError]);

  useEffect(() => {
    if (alertSuccess) {
      setIsSuccess(true);
      toast({
        title: "Success",
        description: "Alert created successfully",
        variant: "success",
      });
    }
  }, [alertSuccess]);

  useEffect(() => {
    if (alertLoading) {
      setIsSuccess(false);
      toast({
        title: "Loading",
        description: "Creating alert",
        variant: "loading",
      });
    }
  }, [alertLoading]);

  const fetch = () => {
    getDevicesList();
    getSensorList();
    getAttributeList();
    getMessageList();
    getOperatorList();
  };

  useEffect(() => {
    fetch();
  }, []);

  const handleSave = (data: AlertFormSubmitNewProps) => {
    createAlert({
      sensor_id: data.sensor_id,
      device_id: data.device_id,
      attribute_id: data.attribute_id,
      message_id: data.message_id,
      operator_id: data.operator_id,
      name: data.name,
      enabled: data.enabled,
      value1: data.value1,
      value2: {
        Valid: data.value2.Valid,
        Float64: data.value2.Value,
      },
      frequency: data.frequency,
    });
    fetch();
  };

  const refresh = () => {
    fetch();
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
              <StyledButton onClick={() => refresh()} variant="text">
                Refresh
              </StyledButton>
            </>
          }
          rightChildren={<h1 className="text-zinc-100 text-lg">Alerts</h1>}
        />
        <div className="w-full p-4 bg-zinc-950/50 rounded-xl flex-grow min-h-0 basis-0 overflow-hidden">
          <div className="flex flex-col gap-4 overflow-auto h-full scrollbar-thumb-zinc-700 scrollbar-track-transparent pr-4">
            {addNew &&
              deviceSuccess &&
              sensorsSuccess &&
              attributeSuccess &&
              messagesSuccess &&
              operatorsSuccess && (
                <div className="p-4 bg-zinc-900 rounded-xl flex flex-col gap-2">
                  <AlertForm
                    id={0}
                    isNew={true}
                    handleSubmission={handleSave}
                    sensors={sensorsData}
                    devices={devicesData}
                    attributes={attributeData}
                    messages={messagesData.map((message) => ({
                      id: message.id,
                      name: message.title,
                    }))}
                    operators={operatorsData.map((operator) => ({
                      id: operator.id,
                      name: operator.op,
                      variables: parseInt(operator.variables),
                    }))}
                  />
                </div>
              )}
          </div>
        </div>
      </>
    )
  );
};

export default AlertWidget;
