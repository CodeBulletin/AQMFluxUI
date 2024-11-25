import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomBaseQuery, getBaseURL, endpoints } from "./api";
import { DeviceType, MessageType } from "@/types/types";

const api = createApi({
  reducerPath: "deviceApi",
  baseQuery: CustomBaseQuery(getBaseURL(endpoints.device)),
  endpoints: (builder) => ({
    getDevices: builder.query<DeviceType[], void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
      }),
    }),
    createDevice: builder.mutation<MessageType, DeviceType>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    updateDevice: builder.mutation<DeviceType, DeviceType>({
      query: (body) => ({
        url: `/`,
        method: "PUT",
        body,
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useLazyGetDevicesQuery,
  useCreateDeviceMutation,
  useUpdateDeviceMutation,
} = api;
export default api;
