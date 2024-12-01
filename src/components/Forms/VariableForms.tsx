import React, { useState } from "react";
import StyledButton from "../Inputs/StyledButton";
import StyledInput from "../Inputs/StyledInput";
import StyledTextarea from "../Inputs/StyledTextarea";

export type VariableFormProps = {
  id: number;
  name: string;
  description: string;
  unit?: string;
  isNew?: boolean;
  handleSubmission: (
    name: string,
    description: string,
    id: number,
    unit?: string
  ) => void;
};

const VariableForms = ({
  id,
  name,
  description,
  unit,
  handleSubmission,
  isNew = false,
}: VariableFormProps) => {
  const [values, setValues] = useState({
    name: name,
    description: description,
    id: id,
    unit: unit,
  });

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      name: e.target.value,
    });
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setValues({
      ...values,
      description: e.target.value,
    });
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      id: parseInt(e.target.value),
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.name.trim() === "") {
      return;
    }

    handleSubmission(values.name, values.description, values.id, values.unit);
  };

  const handleRefresh = () => {
    setValues({
      name: name,
      description: description,
      id: id,
      unit: unit,
    });
  };

  return (
    <div id={"variable-form-" + id}>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center w-full justify-between">
          <div className="w-24">
            <StyledInput
              label="Id"
              value={values.id.toString()}
              onChange={handleIdChange}
              gap="gap-2"
              direction="flex-row"
              labelFontSize="text-lg"
              placeholder="Id"
              type="number"
              disabled={!isNew}
            />
          </div>

          <div className="flex-grow">
            <StyledInput
              label="Name"
              value={values.name}
              onChange={handleNameChange}
              gap="gap-2"
              direction="flex-row"
              labelFontSize="text-lg"
            />
          </div>
          {unit !== undefined && (
            <div className="">
              <StyledInput
                label="Unit"
                value={values.unit || ""}
                onChange={(e) => {
                  setValues({
                    ...values,
                    unit: e.target.value,
                  });
                }}
                gap="gap-2"
                direction="flex-row"
                labelFontSize="text-lg"
                placeholder="Unit"
              />
            </div>
          )}
          {!isNew && (
            <StyledButton type="button" onClick={handleRefresh}>
              Refresh
            </StyledButton>
          )}
          <StyledButton type="submit">{isNew ? "Add" : "Update"}</StyledButton>
        </div>

        <div>
          {/* <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={values.description}
            onChange={handleDescriptionChange}
          /> */}
          <StyledTextarea
            label="Description"
            value={values.description}
            onChange={handleDescriptionChange}
            gap="gap-2"
            direction="flex-col"
            labelFontSize="text-lg"
          />
        </div>
      </form>
    </div>
  );
};

export default VariableForms;
