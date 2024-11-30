import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomBaseQuery, getBaseURL, endpoints } from "./api";
import { SensorType, MessageType, List } from "@/types/types";

const api = createApi({
  reducerPath: "SensorApi",
  baseQuery: CustomBaseQuery(getBaseURL(endpoints.sensor)),
  endpoints: (builder) => ({
    getSensors: builder.query<SensorType[], void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
      }),
    }),
    createSensor: builder.mutation<MessageType, SensorType>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    updateSensor: builder.mutation<SensorType, SensorType>({
      query: (body) => ({
        url: `/`,
        method: "PUT",
        body,
        credentials: "include",
      }),
    }),
    getSensorsList: builder.query<List[], void>({
      query: () => ({
        url: "/all/",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLazyGetSensorsQuery,
  useCreateSensorMutation,
  useUpdateSensorMutation,
  useLazyGetSensorsListQuery,
} = api;
export default api;
