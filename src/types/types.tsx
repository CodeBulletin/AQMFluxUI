export type NullableString = {
  Valid: boolean;
  String: string;
};

export type MessageType = {
  message: string;
  data?: any;
};

export type ConfigKeyType = {
  ckey: string;
  cvalue: NullableString;
  ctype: number;
};

export type OpenWeatherLocationType = {
  name: string;
  country: string;
  state: string;
  lat: number;
  lon: number;
};

export type GetLocationType = {
  city: string;
  state: string;
  country: string;
  limit: number;
};

export type CustomBaseQueryType = {
  baseUrl: string;
};

export type KeyValueType = {
  key: string;
  value: string;
};

export type ToastType = {
  id?: string;
  title?: string;
  description?: string;
  variant?: "success" | "error" | "loading" | "default";
  duration?: number;
};

export type AttributeType = {
  id: number;
  name: string;
  description: string;
  unit: string;
};

export type LocationType = {
  id: number;
  name: string;
  description: string;
};

export type SensorType = {
  id: number;
  name: string;
  description: string;
};

export type DeviceType = {
  id: number;
  name: string;
  description: string;
  ip_address: string;
  port: number;
  mac_address: string;
  location: number;
  sensors: number[];
};

export type NotificationType = {
  id: number;
  topic: string;
  title: string;
  payload: string;
  tags: string;
  priority: number;
};

export type List = {
  id: number;
  name: string;
};

export type Operator = {
  id: number;
  op: string;
  variables: string;
};

export type AlertType = {
  id: number;
  name: string;
  device_id: number;
  sensor_id: number;
  attribute_id: number;
  operator_id: number;
  message_id: number;
  value1: number;
  value2: {
    Valid: boolean;
    Float64: number | null;
  };
  enabled: boolean;
  frequency: number;
};
