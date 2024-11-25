import SearchWithSuggestions, {
  SearchWithSuggestionsRef,
} from "@/components/Inputs/SearchWithSuggestions";
import StyledButton from "@/components/Inputs/StyledButton";
import { Spinner } from "@/components/spinners/Spinner";
import { Card, CardContent } from "@/components/ui/card";
import useDebounce from "@/hooks/useDebounce";
import { useToast } from "@/hooks/useToast";
import {
  useLazyGetConfigQuery,
  useSetConfigKeysMutation,
} from "@/redux/apis/config";
import { useLazyGetOpenWeatherLocationQuery } from "@/redux/apis/openweather";
import { ConfigKeyType, OpenWeatherLocationType } from "@/types/types";
import { MapPin } from "lucide-react";
import React, { useEffect, useRef } from "react";

const LocationWidget = () => {
  const [getConifgs, { data, isFetching, isSuccess, isError }] =
    useLazyGetConfigQuery();

  const [
    getOpenWeatherLocation,
    { data: locationData, isFetching: locationLoading },
  ] = useLazyGetOpenWeatherLocationQuery();

  const [
    setConfigKeys,
    { isSuccess: isSetSuccess, isLoading: isSetLoading, isError: isSetError },
  ] = useSetConfigKeysMutation();

  const [location, setLocation] = React.useState("");
  const [debouncedLocation, startDebounce, cancelDebounce] = useDebounce(
    location,
    500
  );
  const [option, setOption] = React.useState<OpenWeatherLocationType | null>(
    null
  );
  const [doCancel, setDoCancel] = React.useState(false);

  const ref = useRef<SearchWithSuggestionsRef>(null);

  const { toast } = useToast();

  useEffect(() => {
    getConifgs(["LOCATION", "LAT", "LON"]);
  }, []);

  useEffect(() => {
    if (doCancel && startDebounce) {
      cancelDebounce();
      setDoCancel(false);
    }
  }, [doCancel, startDebounce]);

  useEffect(() => {
    console.log("debouncedLocation", debouncedLocation, ref.current?.hasMatch);
    if (debouncedLocation && !ref.current?.hasMatch) {
      const [city, state, country] = debouncedLocation
        .split(",")
        .map((s) => s.trim());
      getOpenWeatherLocation({ city, state, country, limit: 5 });
    }
  }, [debouncedLocation]);

  useEffect(() => {
    if (isSuccess && data) {
      data.map((config: ConfigKeyType) => {
        if (config.ctype == 1) {
          setLocation((_) => (config.cvalue.Valid ? config.cvalue.String : ""));
          setDoCancel((_) => true);
        }
      });
    }
  }, [isFetching]);

  useEffect(() => {
    if (option) {
      setLocation((_) =>
        `${option.name}, ${option.state}, ${option.country}`.trim()
      );
      setDoCancel((_) => true);
    }
  }, [option]);

  const reset = () => {
    setOption(null);
    getConifgs(["LOCATION", "LAT", "LON"]);
  };

  const Lat = option
    ? {
        cvalue: { Valid: true, String: option.lat.toString() },
      }
    : data?.find((config: ConfigKeyType) => config.ckey == "LAT") || {
        cvalue: { Valid: false, String: "0" },
      };

  const Lon = option
    ? {
        cvalue: { Valid: true, String: option.lon.toString() },
      }
    : data?.find((config: ConfigKeyType) => config.ckey == "LON") || {
        cvalue: { Valid: false, String: "0" },
      };

  const handleSave = () => {
    if (option) {
      setConfigKeys([
        {
          key: "LAT",
          value: option.lat.toString(),
        },
        {
          key: "LON",
          value: option.lon.toString(),
        },
        {
          key: "LOCATION",
          value: location,
        },
      ]);
    }
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
        duration: 10000,
      });
    }
  }, [isSetError]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "Failed to get config data",
        variant: "error",
        duration: 10000,
      });

      setTimeout(() => {
        getConifgs(["LOCATION", "LAT", "LON"]);
      }, 2000);
    }
  }, [isError]);

  if (isFetching)
    return (
      <Card className="m-8 p-8 mb-0 mr-0 flex-grow bg-zinc-800 border-none flex flex-col justify-between">
        <Spinner />
      </Card>
    );

  if (isError)
    return (
      <Card className="m-8 p-8 mb-0 mr-0 flex-grow bg-zinc-800 border-none flex flex-col justify-between">
        <Spinner />
      </Card>
    );

  return (
    isSuccess && (
      <Card className="m-8 p-8 mb-0 mr-0 flex-grow bg-zinc-800 border-none flex flex-col justify-between">
        <div className="gap-10 flex-col flex w-full">
          <SearchWithSuggestions
            gap="gap-3"
            direction="flex-col"
            labelFontSize="1.5rem"
            setSelectedOption={setOption}
            optionSelector={(option: OpenWeatherLocationType) => option}
            optionRenderer={(option: OpenWeatherLocationType) =>
              `${option.name}, ${option.state}, ${option.country}`
            }
            optionSuggestions={(option: OpenWeatherLocationType) =>
              `${option.name}, ${option.state}, ${option.country}`
            }
            optionKey={(option: OpenWeatherLocationType) =>
              `${option.name}, ${option.state}, ${option.country}`
            }
            suggestions={locationData || []}
            value={location}
            setValue={setLocation}
            label={"Location"}
            isLoading={locationLoading}
            ref={ref}
          />
        </div>
        <div className="flex justify-between items-end">
          <Card className="bg-zinc-900 text-zinc-100 w-fit border-none">
            <CardContent className="p-2">
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-zinc-400" />
                <div className="flex items-center space-x-3 hidelastdiv">
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-zinc-400 mr-1">
                      Lat
                    </span>
                    <span className="text-sm font-bold text-zinc-100">
                      {Lat.cvalue.Valid ? Lat.cvalue.String : "0"}°
                    </span>
                  </div>
                  <div className="h-4 w-px bg-zinc-700" />
                </div>
                <div className="flex items-center space-x-3 hidelastdiv">
                  <div className="flex items-center">
                    <span className="text-xs font-medium text-zinc-400 mr-1">
                      Lon
                    </span>
                    <span className="text-sm font-bold text-zinc-100">
                      {Lon.cvalue.Valid ? Lon.cvalue.String : "0"}°
                    </span>
                  </div>
                  <div className="h-4 w-px bg-zinc-700" />
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="flex gap-4">
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
      </Card>
    )
  );

  return <></>;
};

export default LocationWidget;
