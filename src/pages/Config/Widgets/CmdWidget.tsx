import StyledButton from "@/components/Inputs/StyledButton";
import StyledInterval from "@/components/Inputs/StyledInterval";
import { Card, CardContent } from "@/components/ui/card";
import { CircleArrowUp, RotateCcw } from "lucide-react";
import { Spinner } from "@/components/spinners/Spinner";
import React, { useEffect } from "react";
import {
  useLazyGetConfigQuery,
  useSetConfigKeysMutation,
} from "@/redux/apis/config";
import { useToast } from "@/hooks/useToast";

const CmdWidget = () => {
  // const configSelector = getConfig.select();
  // const { isSuccess, isError, isLoading, data } = useSelector(
  //   (state: RootState) => configSelector(state)
  // );

  const [interval, setInterval] = React.useState(60);

  const [getConifgs, { data, isFetching, isSuccess, isError }] =
    useLazyGetConfigQuery();

  const [
    setConfigKeys,
    { isSuccess: isSetSuccess, isLoading: isSetLoading, isError: isSetError },
  ] = useSetConfigKeysMutation();

  const { toast } = useToast();

  useEffect(() => {
    getConifgs(["UPDATE INTERVAL"]);
  }, []);

  useEffect(() => {
    if (isSuccess && data) {
      setInterval(
        data[0].cvalue.Valid
          ? parseInt(data[0].cvalue.String == "" ? "60" : data[0].cvalue.String)
          : 60
      );
    }
  }, [isSuccess]);

  const handleSave = () => {
    setConfigKeys([
      {
        key: "UPDATE INTERVAL",
        value: interval.toString(),
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
        getConifgs(["UPDATE INTERVAL"]);
      }, 2000);
    }
  }, [isError]);

  const reset = () => {
    getConifgs(["UPDATE INTERVAL"]);
  };

  if (isFetching)
    return (
      <Card className="bg-zinc-800 text-zinc-100 border-none mb-8 ml-8 flex-grow">
        <Spinner />
      </Card>
    );

  if (isError)
    return (
      <Card className="bg-zinc-800 text-zinc-100 border-none mb-8 ml-8 flex-grow">
        <Spinner />
      </Card>
    );

  return (
    <Card className="bg-zinc-800 text-zinc-100 border-none mb-8 ml-8 flex-grow">
      <CardContent className="p-8 flex flex-col gap-8 justify-between h-full">
        <StyledInterval
          intervalValue={interval}
          onChange={(value) => setInterval(value)}
          max={10}
        />
        <div className="flex justify-between">
          <div className="flex gap-8">
            <StyledButton
              onClick={() => {}}
              icon={RotateCcw}
              variant="inverted"
            >
              Restart ALL
            </StyledButton>

            <StyledButton
              onClick={() => {}}
              icon={CircleArrowUp}
              variant="inverted"
            >
              OTA Update ALL
            </StyledButton>
          </div>

          <div className="flex gap-4 justify-end">
            <StyledButton onClick={() => reset()} variant="invertedText">
              Reset
            </StyledButton>
            <StyledButton
              onClick={() => handleSave()}
              variant="inverted"
              isLoading={isSetLoading}
              loadingText="Saving"
            >
              Save
            </StyledButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CmdWidget;
