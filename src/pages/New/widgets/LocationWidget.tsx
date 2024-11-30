import VariableForms from "@/components/Forms/VariableForms";
import { SearchInput } from "@/components/Inputs/SearchInput";
import StyledButton from "@/components/Inputs/StyledButton";
import Topbar from "@/components/menus/topbar";
import { Spinner } from "@/components/spinners/Spinner";
import { useToast } from "@/hooks/useToast";
import {
  useCreateLocationMutation,
  useLazyGetLocationsQuery,
  useUpdateLocationMutation,
} from "@/redux/apis/location";
import { useEffect, useState } from "react";

const LocationWidget = () => {
  const [getLocations, { data, isSuccess, isError, isFetching }] =
    useLazyGetLocationsQuery();
  const [
    createLocation,
    {
      isSuccess: createSuccess,
      isError: createError,
      isLoading: createFetching,
    },
  ] = useCreateLocationMutation();

  const [
    updateLocation,
    {
      isSuccess: updateSuccess,
      isError: updateError,
      isLoading: updateFetching,
    },
  ] = useUpdateLocationMutation();

  const { toast, removeToast } = useToast();
  const [addNew, setAddNew] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getLocations();
  }, []);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "Failed to fetch Locations",
        variant: "error",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (createError) {
      toast({
        title: "Error",
        description: "Failed to create Location",
        variant: "error",
      });
    }
  }, [createError]);

  useEffect(() => {
    if (createSuccess) {
      toast({
        title: "Success",
        description: "Location created successfully",
        variant: "success",
      });
      getLocations();
      setAddNew(false);
    }
  }, [createSuccess]);

  useEffect(() => {
    if (createFetching) {
      toast({
        id: "create-Location",
        title: "Loading",
        description: "Creating Location",
        variant: "loading",
      });
    } else {
      removeToast("create-Location");
    }
  }, [createFetching]);

  useEffect(() => {
    if (updateError) {
      toast({
        title: "Error",
        description: "Failed to update Location",
        variant: "error",
      });
    }
  }, [updateError]);

  useEffect(() => {
    if (updateSuccess) {
      toast({
        title: "Success",
        description: "Location updated successfully",
        variant: "success",
      });
      getLocations();
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateFetching) {
      toast({
        id: "update-Location",
        title: "Loading",
        description: "Updating Location",
        variant: "loading",
      });
    } else {
      removeToast("update-Location");
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
    createLocation({ name, description, id });
  };

  const handleUpdate = (name: string, description: string, id: number) => {
    updateLocation({ name, description, id });
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
              <StyledButton onClick={() => getLocations()} variant="text">
                Refresh
              </StyledButton>
            </>
          }
          rightChildren={<h1 className="text-zinc-100 text-lg">Locations</h1>}
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
              .filter((loc) => {
                if (search === "") return true;
                return loc.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((loc) => (
                <div
                  key={loc.id}
                  className="p-4 bg-zinc-900 rounded-xl flex flex-col gap-2"
                >
                  <VariableForms {...loc} handleSubmission={handleUpdate} />
                </div>
              ))}
          </div>
        </div>
      </>
    )
  );
};

export default LocationWidget;
