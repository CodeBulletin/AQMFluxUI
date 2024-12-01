import MessageForm, {
  MessageFormSubmitNewProps,
} from "@/components/Forms/MessageForm";
import SearchSelect from "@/components/Inputs/SearchSelect";
import StyledButton from "@/components/Inputs/StyledButton";
import Topbar from "@/components/menus/topbar";
import { Spinner } from "@/components/spinners/Spinner";
import { useToast } from "@/hooks/useToast";
import {
  useCreateMessagesMutation,
  useDeleteMessageMutation,
  useLazyGetMessageQuery,
  useLazyGetMessagesQuery,
  useUpdateMessageMutation,
} from "@/redux/apis/message";
import { useEffect, useState } from "react";

const MessageWidget = () => {
  const [addNew, setAddNew] = useState(false);
  const [search, setSearch] = useState("");
  const [
    createMessage,
    {
      isSuccess: newMessageSuccess,
      isError: newMessageError,
      isLoading: newMessageLoading,
    },
  ] = useCreateMessagesMutation();

  const [getMessages, { data, isSuccess, isError, isFetching }] =
    useLazyGetMessagesQuery();

  const [
    updateMessage,
    {
      isSuccess: updateMessageSuccess,
      isError: updateMessageError,
      isLoading: updateMessageLoading,
    },
  ] = useUpdateMessageMutation();

  const [
    deleteMessage,
    {
      isSuccess: deleteMessageSuccess,
      isError: deleteMessageError,
      isLoading: deleteMessageLoading,
    },
  ] = useDeleteMessageMutation();

  const [
    getMessage,
    {
      data: messageData,
      isSuccess: messageSuccess,
      isError: messageError,
      isLoading: messageLoading,
    },
  ] = useLazyGetMessageQuery();

  const { toast } = useToast();

  useEffect(() => {
    if (newMessageSuccess) {
      toast({
        title: "Message Created",
        description: "The message was created successfully",
        variant: "success",
      });
    }
  }, [newMessageSuccess]);

  useEffect(() => {
    if (newMessageError) {
      toast({
        title: "Message Creation Failed",
        description: "The message was not created",
        variant: "error",
      });
    }
  }, [newMessageError]);

  useEffect(() => {
    if (newMessageLoading) {
      toast({
        title: "Message Creation",
        description: "The message is being created",
        variant: "loading",
      });
    }
  }, [newMessageLoading]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "Message Fetch Failed",
        description: "The messages could not be fetched",
        variant: "error",
      });
    }
  }, [isError]);

  useEffect(() => {
    if (messageError) {
      toast({
        title: "Message Fetch Failed",
        description: "The message could not be fetched",
        variant: "error",
      });
    }
  }, [messageError]);

  useEffect(() => {
    if (messageLoading) {
      toast({
        title: "Message Fetch",
        description: "The message is being fetched",
        variant: "loading",
      });
    }
  }, [messageLoading]);

  useEffect(() => {
    if (updateMessageSuccess) {
      toast({
        title: "Message Updated",
        description: "The message was updated successfully",
        variant: "success",
      });
    }
  }, [updateMessageSuccess]);

  useEffect(() => {
    if (updateMessageError) {
      toast({
        title: "Message Update Failed",
        description: "The message was not updated",
        variant: "error",
      });
    }
  }, [updateMessageError]);

  useEffect(() => {
    if (updateMessageLoading) {
      toast({
        title: "Message Update",
        description: "The message is being updated",
        variant: "loading",
      });
    }
  }, [updateMessageLoading]);

  useEffect(() => {
    if (deleteMessageSuccess) {
      toast({
        title: "Message Deleted",
        description: "The message was deleted successfully",
        variant: "success",
      });
    }
  }, [deleteMessageSuccess]);

  useEffect(() => {
    if (deleteMessageError) {
      toast({
        title: "Message Deletion Failed",
        description: "The message was not deleted",
        variant: "error",
      });
    }
  }, [deleteMessageError]);

  useEffect(() => {
    if (deleteMessageLoading) {
      toast({
        title: "Message Deletion",
        description: "The message is being deleted",
        variant: "loading",
      });
    }
  }, [deleteMessageLoading]);

  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    if (search !== "") {
      getMessage(parseInt(search));
    }
  }, [search]);

  const handleSubmission = (data: MessageFormSubmitNewProps) => {
    createMessage({
      topic: data.topic,
      title: data.title,
      priority: data.priority,
      tags: data.tags,
      payload: data.payload,
    });
    setAddNew(false);
    getMessages();
    setSearch("");
  };

  const handleUpdate = (data: MessageFormSubmitNewProps, id?: number) => {
    updateMessage({
      topic: data.topic,
      title: data.title,
      priority: data.priority,
      tags: data.tags,
      payload: data.payload,
      id: id || 0,
    });
    setAddNew(false);
    getMessages();
    setSearch("");
  };

  const handleDelete = (id: number) => {
    deleteMessage(id);
    setAddNew(false);
    getMessages();
    setSearch("");
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
          centerChildren={
            <div className="w-full">
              <SearchSelect
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                options={[
                  { value: "", label: "Select a message", disabled: true },
                  ...(data?.map((message) => ({
                    value: message.id.toString(),
                    label: `${message.id} - ${message.title}`,
                    disabled: false,
                  })) || []),
                ]}
              />
            </div>
          }
          leftChildren={
            <>
              <StyledButton onClick={() => setAddNew(!addNew)}>
                {addNew ? "Cancel" : "Add New"}
              </StyledButton>
              <StyledButton onClick={() => getMessages()} variant="text">
                Refresh
              </StyledButton>
            </>
          }
          rightChildren={<h1 className="text-zinc-100 text-lg">Messages</h1>}
        />
        <div className="w-full rounded-xl flex-grow min-h-0 basis-0 overflow-hidden bg-zinc-950/50 p-4">
          <div className="flex overflow-auto h-full">
            {addNew ? (
              <MessageForm
                id={-1}
                isNew={true}
                handleSubmission={handleSubmission}
                key={0}
              />
            ) : (
              messageSuccess &&
              search !== "" && (
                <MessageForm
                  id={parseInt(search)}
                  isNew={false}
                  title={messageData?.title}
                  topic={messageData?.topic}
                  priority={messageData?.priority}
                  tags={messageData?.tags}
                  payload={messageData?.payload}
                  handleSubmission={handleUpdate}
                  handleDelete={handleDelete}
                />
              )
            )}
          </div>
        </div>
      </>
    )
  );
};

export default MessageWidget;
