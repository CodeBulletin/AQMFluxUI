import VariableForms from "@/components/Forms/VariableForms";
import { SearchInput } from "@/components/Inputs/SearchInput";
import StyledButton from "@/components/Inputs/StyledButton";
import Topbar from "@/components/menus/topbar";
import { Spinner } from "@/components/spinners/Spinner";
import { useToast } from "@/hooks/useToast";
import {
  useCreateAttributeMutation,
  useLazyGetAttributesQuery,
  useUpdateAttributeMutation,
} from "@/redux/apis/attribute";
import { useEffect, useState } from "react";

const VariablesWidget = () => {
  const [getAttributes, { data, isSuccess, isError, isFetching }] =
    useLazyGetAttributesQuery();
  const [
    createAttribute,
    {
      isSuccess: createSuccess,
      isError: createError,
      isLoading: createFetching,
    },
  ] = useCreateAttributeMutation();

  const [
    updateAttribute,
    {
      isSuccess: updateSuccess,
      isError: updateError,
      isLoading: updateFetching,
    },
  ] = useUpdateAttributeMutation();

  const { toast, removeToast } = useToast();
  const [addNew, setAddNew] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getAttributes();
  }, []);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: "Failed to fetch attributes",
        variant: "error",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (createError) {
      toast({
        title: "Error",
        description: "Failed to create attribute",
        variant: "error",
      });
    }
  }, [createError]);

  useEffect(() => {
    if (createSuccess) {
      toast({
        title: "Success",
        description: "Attribute created successfully",
        variant: "success",
      });
      getAttributes();
      setAddNew(false);
    }
  }, [createSuccess]);

  useEffect(() => {
    if (createFetching) {
      toast({
        id: "create-attribute",
        title: "Loading",
        description: "Creating attribute",
        variant: "loading",
      });
    } else {
      removeToast("create-attribute");
    }
  }, [createFetching]);

  useEffect(() => {
    if (updateError) {
      toast({
        title: "Error",
        description: "Failed to update attribute",
        variant: "error",
      });
    }
  }, [updateError]);

  useEffect(() => {
    if (updateSuccess) {
      toast({
        title: "Success",
        description: "Attribute updated successfully",
        variant: "success",
      });
      getAttributes();
    }
  }, [updateSuccess]);

  useEffect(() => {
    if (updateFetching) {
      toast({
        id: "update-attribute",
        title: "Loading",
        description: "Updating attribute",
        variant: "loading",
      });
    } else {
      removeToast("update-attribute");
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

  const handleAddNew = (
    name: string,
    description: string,
    id: number,
    unit?: string
  ) => {
    createAttribute({ name, description, id, unit: unit || "" });
  };

  const handleUpdate = (
    name: string,
    description: string,
    id: number,
    unit?: string
  ) => {
    updateAttribute({ name, description, id, unit: unit || "" });
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
              <StyledButton onClick={() => getAttributes()} variant="text">
                Refresh
              </StyledButton>
            </>
          }
          rightChildren={<h1 className="text-zinc-100 text-lg">Variables</h1>}
        />
        <div className="w-full p-4 bg-zinc-950/50 rounded-xl flex-grow min-h-0 basis-0 overflow-hidden">
          <div className="flex flex-col gap-4 overflow-auto h-full scrollbar-thumb-zinc-700 scrollbar-track-transparent pr-4">
            {addNew && (
              <div className="p-4 bg-zinc-900 rounded-xl flex flex-col gap-2">
                <VariableForms
                  id={0}
                  name=""
                  description=""
                  unit=""
                  isNew={true}
                  handleSubmission={handleAddNew}
                />
              </div>
            )}
            {data
              .filter((attr) => {
                if (search === "") return true;
                return attr.name.toLowerCase().includes(search.toLowerCase());
              })
              .map((attr) => (
                <div
                  key={attr.id}
                  className="p-4 bg-zinc-900 rounded-xl flex flex-col gap-2"
                >
                  <VariableForms {...attr} handleSubmission={handleUpdate} />
                </div>
              ))}
          </div>
        </div>
      </>
    )
  );
};

export default VariablesWidget;
