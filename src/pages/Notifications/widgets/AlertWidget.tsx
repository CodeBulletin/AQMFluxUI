import AlertForm, {
  AlertFormSubmitNewProps,
} from "@/components/Forms/AlertForm";
import { SearchInput } from "@/components/Inputs/SearchInput";
import StyledButton from "@/components/Inputs/StyledButton";
import Topbar from "@/components/menus/topbar";
import { Spinner } from "@/components/spinners/Spinner";
import { useToast } from "@/hooks/useToast";
import {
  useCreateAlertMutation,
  useDeleteAlertMutation,
  useLazyGetAlertsQuery,
  useUpdateAlertMutation,
} from "@/redux/apis/alert";
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
    {
      data: devicesData,
      error: devicesError,
      isSuccess: deviceSuccess,
      isLoading: devicesLoading,
    },
  ] = useLazyGetDeviceListQuery();
  const [
    getSensorList,
    {
      data: sensorsData,
      error: sensorsError,
      isSuccess: sensorsSuccess,
      isLoading: sensorsLoading,
    },
  ] = useLazyGetSensorsListQuery();
  const [
    getAttributeList,
    {
      data: attributeData,
      error: attributeError,
      isSuccess: attributeSuccess,
      isLoading: attributeLoading,
    },
  ] = useLazyGetAttributeListQuery();
  const [
    getMessageList,
    {
      data: messagesData,
      error: messagesError,
      isSuccess: messagesSuccess,
      isLoading: messagesLoading,
    },
  ] = useLazyGetMessagesQuery();
  const [
    getOperatorList,
    {
      data: operatorsData,
      error: operatorsError,
      isSuccess: operatorsSuccess,
      isLoading: operatorsLoading,
    },
  ] = useLazyGetOperatorsQuery();

  const [
    createAlert,
    { isSuccess: alertSuccess, isError: alertError, isLoading: alertLoading },
  ] = useCreateAlertMutation();

  const [
    deleteAlert,
    {
      isSuccess: alertDeleteSuccess,
      isError: alertDeleteError,
      isLoading: alertDeleteLoading,
    },
  ] = useDeleteAlertMutation();

  const [
    updateAlert,
    {
      isSuccess: alertUpdateSuccess,
      isError: alertUpdateError,
      isLoading: alertUpdateLoading,
    },
  ] = useUpdateAlertMutation();

  const [
    getAlerts,
    {
      data: alertsData,
      isSuccess: alertsSuccess,
      isError: alertsError,
      isFetching: alertsLoading,
    },
  ] = useLazyGetAlertsQuery();

  useEffect(() => {
    if (devicesError) {
      toast({
        title: "Error",
        description: "Failed to fetch devices",
        variant: "error",
      });
    }
  }, [devicesError]);

  useEffect(() => {
    if (sensorsError) {
      toast({
        title: "Error",
        description: "Failed to fetch sensors",
        variant: "error",
      });
    }
  }, [sensorsError]);

  useEffect(() => {
    if (attributeError) {
      toast({
        title: "Error",
        description: "Failed to fetch attributes",
        variant: "error",
      });
    }
  }, [attributeError]);

  useEffect(() => {
    if (messagesError) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        variant: "error",
      });
    }
  }, [messagesError]);

  useEffect(() => {
    if (operatorsError) {
      toast({
        title: "Error",
        description: "Failed to fetch operators",
        variant: "error",
      });
    }
  }, [operatorsError]);

  useEffect(() => {
    if (alertError) {
      toast({
        title: "Error",
        description: "Failed to create alert",
        variant: "error",
      });
    }
  }, [alertError]);

  useEffect(() => {
    if (alertDeleteError) {
      toast({
        title: "Error",
        description: "Failed to delete alert",
        variant: "error",
      });
    }
  }, [alertDeleteError]);

  useEffect(() => {
    if (alertUpdateError) {
      toast({
        title: "Error",
        description: "Failed to update alert",
        variant: "error",
      });
    }
  }, [alertUpdateError]);

  useEffect(() => {
    if (alertSuccess) {
      toast({
        title: "Success",
        description: "Alert created successfully",
        variant: "success",
      });
    }
  }, [alertSuccess]);

  useEffect(() => {
    if (alertLoading) {
      toast({
        title: "Loading",
        description: "Creating alert",
        variant: "loading",
      });
    }
  }, [alertLoading]);

  useEffect(() => {
    if (alertsError) {
      toast({
        title: "Error",
        description: "Failed to fetch alerts",
        variant: "error",
      });
    }
  }, [alertsError]);

  useEffect(() => {
    if (alertDeleteSuccess) {
      toast({
        title: "Success",
        description: "Alert deleted successfully",
        variant: "success",
      });
    }
  }, [alertDeleteSuccess]);

  useEffect(() => {
    if (alertUpdateSuccess) {
      toast({
        title: "Success",
        description: "Alert updated successfully",
        variant: "success",
      });
    }
  }, [alertUpdateSuccess]);

  const fetch = () => {
    getDevicesList();
    getSensorList();
    getAttributeList();
    getMessageList();
    getOperatorList();
    getAlerts();
  };

  useEffect(() => {
    fetch();
  }, []);

  const refresh = () => {
    getAlerts();
  };

  useEffect(() => {
    if (!alertLoading && !alertDeleteLoading && !alertUpdateLoading) {
      if (alertSuccess || alertDeleteSuccess || alertUpdateSuccess) {
        refresh();
      }
    }
  }, [alertLoading, alertDeleteLoading, alertUpdateLoading]);

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
    setAddNew(false);
  };

  const handleUpdate = (data: AlertFormSubmitNewProps, id?: number) => {
    if (!id) {
      toast({
        title: "Error",
        description: "Alert ID not provided",
        variant: "error",
      });
      return;
    }
    updateAlert({
      id: id,
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
  };

  const handleDelete = (id: number) => {
    deleteAlert(id);
    refresh();
  };

  if (
    alertLoading ||
    alertsLoading ||
    devicesLoading ||
    sensorsLoading ||
    attributeLoading ||
    messagesLoading ||
    operatorsLoading
  ) {
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
    alertsSuccess && (
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
                    key={-1}
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
            {alertsData.filter((alert) =>
              alert.name.toLowerCase().includes(search.toLowerCase())
            ).length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <h1 className="text-zinc-300 text-lg">No alerts found</h1>
              </div>
            ) : (
              deviceSuccess &&
              sensorsSuccess &&
              attributeSuccess &&
              messagesSuccess &&
              operatorsSuccess &&
              alertsData
                .filter((alert) =>
                  alert.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((alert) => (
                  <div
                    key={alert.id}
                    className="p-4 bg-zinc-900 rounded-xl flex flex-col gap-2"
                  >
                    <AlertForm
                      key={alert.id}
                      id={alert.id}
                      isNew={false}
                      handleSubmission={handleUpdate}
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
                      sensor_id={alert.sensor_id}
                      device_id={alert.device_id}
                      attribute_id={alert.attribute_id}
                      message_id={alert.message_id}
                      operator_id={alert.operator_id}
                      name={alert.name}
                      enabled={alert.enabled}
                      value1={alert.value1}
                      value2={{
                        Valid: alert.value2.Valid,
                        Value: alert.value2.Float64,
                      }}
                      frequency={alert.frequency}
                      handleDelete={handleDelete}
                    />
                  </div>
                ))
            )}
          </div>
        </div>
      </>
    )
  );
};

export default AlertWidget;
