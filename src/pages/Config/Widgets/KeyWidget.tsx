import StyledButton from "@/components/Inputs/StyledButton";
import StyledInput from "@/components/Inputs/StyledInput";
import { Spinner } from "@/components/spinners/Spinner";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/useToast";
import {
  useLazyGetConfigQuery,
  useSetConfigKeysMutation,
} from "@/redux/apis/config";
import { ConfigKeyType } from "@/types/types";
import { useEffect, useState } from "react";

const KeyWidget = () => {
  const [getConifgs, { data, isFetching, isSuccess, isError }] =
    useLazyGetConfigQuery();

  const [
    setConfigKeys,
    { isSuccess: isSetSuccess, isLoading: isSetLoading, isError: isSetError },
  ] = useSetConfigKeysMutation();

  const { toast } = useToast();

  const [usename, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [openweatherapikey, setOpenWeatherApiKey] = useState("");
  const [openmeteoapikey, setOpenMeteoApiKey] = useState("");

  useEffect(() => {
    getConifgs([
      "USERNAME",
      "PASSWORD",
      "OPEN WEATHER MAP API KEY",
      "OPEN METEO API KEY",
    ]);
  }, []);

  const handleSave = () => {
    setConfigKeys([
      {
        key: "USERNAME",
        value: usename,
      },
      {
        key: "PASSWORD",
        value: password,
      },
      {
        key: "OPEN WEATHER MAP API KEY",
        value: openweatherapikey,
      },
      {
        key: "OPEN METEO API KEY",
        value: openmeteoapikey,
      },
    ]);
  };

  useEffect(() => {
    if (isSetSuccess) {
      toast({
        title: "Success",
        description: "Config saved successfully",
        variant: "success",
        duration: 5000,
      });
    }
  }, [isSetSuccess]);

  useEffect(() => {
    if (isSetError) {
      toast({
        title: "Error",
        description: "Failed to save config",
        variant: "error",
        duration: 5000,
      });
    }
  }, [isSetError]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "Failed to get config data",
        variant: "error",
        duration: 5000,
      });

      setTimeout(() => {
        getConifgs([
          "USERNAME",
          "PASSWORD",
          "OPEN WEATHER MAP API KEY",
          "OPEN METEO API KEY",
        ]);
      }, 2000);
    }
  }, [isError]);

  useEffect(() => {
    if (isSuccess && data) {
      data.forEach((item: ConfigKeyType) => {
        if (item.ckey === "USERNAME") setUsername(item.cvalue.String);
        if (item.ckey === "PASSWORD") setPassword(item.cvalue.String);
        if (item.ckey === "OPEN WEATHER MAP API KEY")
          setOpenWeatherApiKey(item.cvalue.String);
        if (item.ckey === "OPEN METEO API KEY")
          setOpenMeteoApiKey(item.cvalue.String);
      });
    }
  }, [isSuccess]);

  const reset = () => {
    getConifgs([
      "USERNAME",
      "PASSWORD",
      "OPEN WEATHER MAP API KEY",
      "OPEN METEO API KEY",
    ]);
  };

  if (isFetching)
    return (
      <Card className="m-8 p-8 ml-0 flex-grow bg-zinc-800 border-none mb-0 flex flex-col justify-between">
        <Spinner />
      </Card>
    );

  if (isError)
    return (
      <Card className="m-8 p-8 ml-0 flex-grow bg-zinc-800 border-none mb-0 flex flex-col justify-between">
        <Spinner />
      </Card>
    );

  return (
    <Card className="m-8 p-8 ml-0 flex-grow bg-zinc-800 border-none mb-0 flex flex-col justify-between">
      <div className="gap-10 flex-col flex w-{100%}">
        <StyledInput
          label="Username"
          value={usename}
          placeholder="Enter username"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
          type="text"
          gap="gap-3"
          direction="flex-col"
          labelFontSize="1.5rem"
        />
        <StyledInput
          label="Password"
          value={password}
          placeholder="Enter password"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
          type="password"
          gap="gap-3"
          direction="flex-col"
          labelFontSize="1.5rem"
        />
        <StyledInput
          label="Open Weather Map API Key"
          value={openweatherapikey}
          placeholder="Enter Open Weather Map API Key"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOpenWeatherApiKey(e.target.value)
          }
          type="password"
          gap="gap-3"
          direction="flex-col"
          labelFontSize="1.5rem"
        />
        <StyledInput
          label="Open Meteo API Key"
          value={openmeteoapikey}
          placeholder="Enter Open Meteo API Key"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setOpenMeteoApiKey(e.target.value)
          }
          type="password"
          gap="gap-3"
          direction="flex-col"
          labelFontSize="1.5rem"
        />
      </div>
      <div className="flex gap-4 justify-end">
        <StyledButton onClick={() => reset()} variant="invertedText">
          Reset
        </StyledButton>
        <StyledButton onClick={() => handleSave()} variant="inverted">
          Save
        </StyledButton>
      </div>
    </Card>
  );
};

export default KeyWidget;
