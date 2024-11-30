import React, { useState } from "react";
import StyledInput from "../Inputs/StyledInput";
import StyledButton from "../Inputs/StyledButton";
import StyledTextarea from "../Inputs/StyledTextarea";
import StyledSelect from "../Inputs/StyledSelect";
import StyledMultiSelect from "../Inputs/StyledMultiSelect";
// import { parse } from "path";

export type DeviceFormSubmitProps = {
  name: string;
  description: string;
  id: number;
  ipAddress: string;
  macAddress: string;
  port: number;
  locations: number;
  sensors: number[];
};

export type DeviceFormProps = {
  id: number;
  name: string;
  description: string;
  locations: {
    id: number;
    name: string;
  }[];
  selectedLocation: number;
  sensors: {
    id: number;
    name: string;
  }[];
  selectedSensors: number[];
  ipAddress: string;
  macAddress: string;
  port: number;

  isNew?: boolean;
  handleSubmission: (data: DeviceFormSubmitProps) => void;
};

const DeviceForm = ({
  id,
  name,
  description,
  selectedLocation,
  selectedSensors,
  ipAddress,
  macAddress,
  port,
  locations,
  sensors,
  handleSubmission,
  isNew = false,
}: DeviceFormProps) => {
  const [values, setValues] = useState({
    name: name,
    description: description,
    id: id,
    location: selectedLocation,
    ipAddress: ipAddress,
    macAddress: macAddress,
    port: port,
    selectedSensors: selectedSensors,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (values.name.trim() === "") {
      return;
    }

    handleSubmission({
      name: values.name,
      description: values.description,
      id: parseInt(values.id.toString()),
      ipAddress: values.ipAddress,
      macAddress: values.macAddress,
      port: parseInt(values.port.toString()),
      locations: parseInt(values.location.toString()),
      sensors: values.selectedSensors.map((val) => parseInt(val.toString())),
    });
  };

  const handleRefresh = () => {
    setValues({
      name: name,
      description: description,
      id: id,
      location: selectedLocation,
      ipAddress: ipAddress,
      macAddress: macAddress,
      port: port,
      selectedSensors: selectedSensors,
    });
  };

  return (
    <div id={"variable-form-" + id}>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-4 items-center w-full justify-between">
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
              disabled={!isNew}
            />
          </div>
          <div className="w-80">
            <StyledSelect
              options={[
                { value: "-1", label: "Select a location", disabled: true },
                ...locations.map((location) => ({
                  value: location.id.toString(),
                  label: location.name,
                  disabled: false,
                })),
              ]}
              value={values.location.toString()}
              onValueChange={(value) =>
                setValues({
                  ...values,
                  location: parseInt(value),
                })
              }
              label="Location"
            />
          </div>
          <div className="flex-grow">
            <StyledInput
              label="Name"
              value={values.name}
              onChange={handleChange}
              gap="gap-2"
              direction="flex-row"
              labelFontSize="text-lg"
              name="name"
            />
          </div>
          {!isNew && (
            <StyledButton type="button" onClick={handleRefresh}>
              Refresh
            </StyledButton>
          )}
          <StyledButton type="submit">{isNew ? "Add" : "Update"}</StyledButton>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex-grow">
            <StyledInput
              label="IP Address"
              value={values.ipAddress}
              onChange={handleChange}
              gap="gap-2"
              direction="flex-row"
              labelFontSize="text-lg"
              name="ipAddress"
            />
          </div>
          <div className="">
            <StyledInput
              label="Port"
              value={values.port.toString()}
              onChange={handleChange}
              gap="gap-2"
              direction="flex-row"
              labelFontSize="text-lg"
              type="number"
              name="port"
            />
          </div>
          <div className="flex-grow">
            <StyledInput
              label="MAC Address"
              value={values.macAddress}
              onChange={handleChange}
              gap="gap-2"
              direction="flex-row"
              labelFontSize="text-lg"
              name="macAddress"
            />
          </div>
        </div>
        <div>
          <StyledMultiSelect
            options={sensors.map((sensor) => ({
              value: sensor.id.toString(),
              label: sensor.name,
              disabled: false,
            }))}
            selectedValues={
              values.selectedSensors?.map((val) => val.toString()) ?? []
            }
            onSelectionChange={(vals) => {
              setValues({
                ...values,
                selectedSensors: vals.map((val) => parseInt(val)),
              });
            }}
            defaultLabel="Select sensors"
          />
        </div>
        <div>
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

export default DeviceForm;
