import React, { useEffect } from "react";
import StyledInput from "../Inputs/StyledInput";
import StyledSelect from "../Inputs/StyledSelect";
import StyledTextarea from "../Inputs/StyledTextarea";
import StyledButton from "../Inputs/StyledButton";

export type MessageFormSubmitNewProps = {
  topic: string;
  title: string;
  priority: number;
  tags: string;
  payload: string;
};

export type MessageFormProps = {
  id: number;
  topic?: string;
  title?: string;
  priority?: number;
  tags?: string;
  payload?: string;
  isNew: boolean;
  handleSubmission: (data: MessageFormSubmitNewProps, id?: number) => void;
  handleDelete?: (id: number) => void;
};

const MessageForm = ({
  id,
  isNew,
  topic = "",
  priority = 2,
  title = "",
  tags = "",
  payload = "",
  handleSubmission,
  handleDelete = undefined,
}: MessageFormProps) => {
  const [values, setValues] = React.useState({
    id: id,
    topic: topic,
    title: title,
    priority: priority,
    tags: tags,
    payload: payload,
  });

  useEffect(() => {
    setValues({
      id: id,
      topic: topic,
      title: title,
      priority: priority,
      tags: tags,
      payload: payload,
    });
  }, [id, topic, title, priority, tags, payload]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setValues({
      ...values,
      priority: parseInt(value),
    });
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValues({
      ...values,
      payload: e.target.value,
    });
  };

  const handleSubmissionWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmission(values, id);
  };

  const handleRefresh = () => {
    setValues({
      id: id,
      topic: topic,
      title: title,
      priority: priority,
      tags: tags,
      payload: payload,
    });
  };

  return (
    <div className="h-full w-full bg-zinc-900 p-4 rounded-xl">
      <form
        onSubmit={handleSubmissionWrapper}
        className="flex flex-col gap-4 h-full"
      >
        <div className="flex flex-row gap-4">
          {!isNew && (
            <div className="w-24">
              <StyledInput
                label="Id"
                value={values.id.toString()}
                onChange={handleChange}
                gap="gap-2"
                direction="flex-row"
                labelFontSize="text-lg"
                placeholder="Id"
                type="number"
                name="id"
                disabled={true}
              />
            </div>
          )}

          <div className="w-50">
            <StyledInput
              label="Topic"
              value={values.topic}
              onChange={handleChange}
              gap="gap-2"
              direction="flex-row"
              labelFontSize="text-lg"
              placeholder="Topic"
              type="text"
              name="topic"
            />
          </div>

          <div className="flex-grow">
            <StyledInput
              label="Title"
              value={values.title}
              onChange={handleChange}
              gap="gap-2"
              direction="flex-row"
              labelFontSize="text-lg"
              placeholder="Title"
              type="text"
              name="title"
            />
          </div>
          {!isNew && (
            <StyledButton type="button" onClick={handleRefresh}>
              Refresh
            </StyledButton>
          )}
          <StyledButton type="submit">{isNew ? "Add" : "Update"}</StyledButton>
          {handleDelete && (
            <StyledButton type="button" onClick={() => handleDelete(id)}>
              Delete
            </StyledButton>
          )}
        </div>

        <div className="flex flex-row gap-4">
          <div className="w-80">
            <StyledSelect
              placeholder="Priority"
              value={values.priority.toString()}
              onValueChange={handleSelectChange}
              name="priority"
              options={[
                { value: "1", label: "Min" },
                { value: "2", label: "Low" },
                { value: "3", label: "Default" },
                { value: "4", label: "High" },
                { value: "5", label: "Max" },
              ]}
              label="Priority"
            />
          </div>
          <div className="flex-grow">
            <StyledInput
              label="Tags"
              value={values.tags}
              onChange={handleChange}
              gap="gap-2"
              direction="flex-row"
              labelFontSize="text-lg"
              placeholder="Tags"
              type="text"
              name="tags"
            />
          </div>
        </div>
        <div className="flex-grow flex flex-col">
          <StyledTextarea
            direction="flex-col"
            gap="gap-2"
            label="Message"
            labelFontSize="text-lg"
            value={values.payload}
            onChange={handleTextareaChange}
          />
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
