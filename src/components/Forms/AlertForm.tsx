import React from "react";
import StyledInput from "../Inputs/StyledInput";
import StyledSelect from "../Inputs/StyledSelect";
import StyledButton from "../Inputs/StyledButton";
import StyledInterval from "../Inputs/StyledInterval";
import StyledLabel from "../Text/StyledLabel";
import StyledToggle from "../Inputs/StyledToggle";

export type AlertFormSubmitNewProps = {
  sensor_id: number;
  device_id: number;
  attribute_id: number;
  message_id: number;
  operator_id: number;
  name: string;
  enabled: boolean;
  value1: number;
  value2: {
    Valid: boolean;
    Value: number | null;
  };
  frequency: number;
};

export type AlertFormProps = {
  id: number;
  isNew: boolean;
  sensor_id?: number;
  sensors: { id: number; name: string }[];
  device_id?: number;
  devices: { id: number; name: string }[];
  attribute_id?: number;
  attributes: { id: number; name: string }[];
  message_id?: number;
  messages: { id: number; name: string }[];
  operator_id?: number;
  operators: { id: number; name: string; variables: number }[];
  name?: string;
  enabled?: boolean;
  value1?: number;
  value2?: number | null;
  frequency?: number;
  handleSubmission: (data: AlertFormSubmitNewProps, id?: number) => void;
  handleDelete?: (id: number) => void;
};

const AlertForm = ({
  id,
  isNew,
  sensor_id = -1,
  device_id = -1,
  attribute_id = -1,
  message_id = -1,
  operator_id = -1,
  name = "",
  enabled = false,
  value1 = 0,
  value2 = null,
  frequency = 1,
  sensors,
  devices,
  attributes,
  messages,
  operators,
  handleSubmission,
  handleDelete,
}: AlertFormProps) => {
  const [values, setValues] = React.useState({
    id: id,
    sensor_id: sensor_id,
    device_id: device_id,
    attribute_id: attribute_id,
    message_id: message_id,
    operator_id: operator_id,
    name: name,
    enabled: enabled,
    value1: value1,
    value2: value2,
    frequency: frequency,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((_) => ({
      ...values,
      [e.target.name]: parseFloat(e.target.value),
    }));
    console.log(values);
  };

  const handleSelectChange = (name: string) => (value: string) => {
    setValues({
      ...values,
      [name]: parseInt(value),
    });
  };

  const handleSubmissionWrapper = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSubmission(
      {
        sensor_id: values.sensor_id,
        device_id: values.device_id,
        attribute_id: values.attribute_id,
        message_id: values.message_id,
        operator_id: values.operator_id,
        name: values.name,
        enabled: values.enabled,
        value1: values.value1,
        value2: {
          Valid:
            operators.find((x) => x.id === values.operator_id)?.variables === 2,
          Value: values.value2,
        },
        frequency: values.frequency,
      },
      id
    );
  };

  const handleRefresh = () => {
    // setValues({
    //   id: id,
    //   topic: topic,
    //   title: title,
    //   priority: priority,
    //   tags: tags,
    //   payload: payload,
    // });
  };

  return (
    <div className="h-full w-full bg-zinc-900 rounded-xl">
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
          <div className="flex-grow">
            <StyledInput
              label="Name"
              value={values.name}
              onChange={handleChange}
              gap="gap-2"
              direction="flex-row"
              labelFontSize="text-lg"
              placeholder="Name"
              type="text"
              name="name"
            />
          </div>
          <StyledToggle
            defaultChecked={values.enabled}
            onChange={(checked) => setValues({ ...values, enabled: checked })}
          />
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
          <div className="flex-grow">
            <StyledSelect
              label="Device"
              value={values.device_id.toString()}
              options={devices.map((x) => ({
                value: x.id.toString(),
                label: x.name,
              }))}
              onValueChange={handleSelectChange("device_id")}
            />
          </div>
          <div className="flex-grow">
            <StyledSelect
              label="Sensor"
              value={values.sensor_id.toString()}
              options={sensors.map((x) => ({
                value: x.id.toString(),
                label: x.name,
              }))}
              onValueChange={handleSelectChange("sensor_id")}
            />
          </div>
          <div className="flex-grow">
            <StyledSelect
              label="Message"
              value={values.message_id.toString()}
              options={messages.map((x) => ({
                value: x.id.toString(),
                label: x.name,
              }))}
              onValueChange={handleSelectChange("message_id")}
            />
          </div>
        </div>
        <div className="flex flex-grow gap-4">
          <div className="flex-grow">
            <StyledInterval
              label="Frequency"
              intervalValue={values.frequency}
              max={3}
              onChange={(val) => setValues({ ...values, frequency: val })}
              labelSize="14px"
              labelGap="gap-2"
            />
          </div>
          <div className="">
            <StyledSelect
              label="Attribute"
              value={values.attribute_id.toString()}
              options={attributes.map((x) => ({
                value: x.id.toString(),
                label: x.name,
              }))}
              onValueChange={handleSelectChange("attribute_id")}
            />
          </div>
          <StyledLabel>:</StyledLabel>
          <div className="">
            <StyledSelect
              label=""
              value={values.operator_id.toString()}
              options={operators.map((x) => ({
                value: x.id.toString(),
                label: x.name,
              }))}
              onValueChange={handleSelectChange("operator_id")}
            />
          </div>
          {operators.find((x) => x.id === values.operator_id)?.variables ===
          1 ? (
            <div className="">
              <StyledInput
                label=""
                value={values.value1.toString()}
                onChange={handleValueChange}
                gap="gap-0"
                direction="flex-row"
                labelFontSize="text-lg"
                placeholder="Value 1"
                type="number"
                name="value1"
              />
            </div>
          ) : (
            <>
              <StyledLabel>(</StyledLabel>
              <div className="">
                <StyledInput
                  label=""
                  value={values.value1.toString()}
                  onChange={handleValueChange}
                  gap="gap-0"
                  direction="flex-row"
                  labelFontSize="text-lg"
                  placeholder="Value 1"
                  type="number"
                  name="value1"
                />
              </div>
              <StyledLabel>,</StyledLabel>
              <div className="">
                <StyledInput
                  label=""
                  value={(values.value2 || 0).toString()}
                  onChange={handleValueChange}
                  gap="gap-0"
                  direction="flex-row"
                  labelFontSize="text-lg"
                  placeholder="Value 2"
                  type="number"
                  name="value2"
                />
              </div>
              <StyledLabel>)</StyledLabel>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default AlertForm;
