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
  }),
});

export const { useCreateAlertMutation } = api;
export default api;
