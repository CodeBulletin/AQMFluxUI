import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomBaseQuery, getBaseURL, endpoints } from "./api";
import { AlertType } from "@/types/types";

const api = createApi({
  reducerPath: "alertApi",
  baseQuery: CustomBaseQuery(getBaseURL(endpoints.alert)),
  endpoints: (builder) => ({
    createAlert: builder.mutation<AlertType, Omit<AlertType, "id">>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    getAlerts: builder.query<AlertType[], void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
      }),
    }),
    deleteAlert: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}/`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
    updateAlert: builder.mutation<AlertType, AlertType>({
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
  useCreateAlertMutation,
  useLazyGetAlertsQuery,
  useDeleteAlertMutation,
  useUpdateAlertMutation,
} = api;
export default api;
