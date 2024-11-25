import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomBaseQuery, getBaseURL, endpoints } from "./api";
import { ConfigKeyType, KeyValueType, MessageType } from "@/types/types";

const api = createApi({
  reducerPath: "configApi",
  baseQuery: CustomBaseQuery(getBaseURL(endpoints.config)),
  endpoints: (builder) => ({
    getConfig: builder.query<ConfigKeyType[], string[]>({
      query: (keys) => ({
        url: `/keys?keys=${keys.join(",")}`,
        method: "POST",
        credentials: "include",
      }),
    }),
    setConfigKeys: builder.mutation<MessageType, KeyValueType[]>({
      query: (data) => ({
        url: "/",
        method: "PUT",
        body: data,
        credentials: "include",
      }),
    }),
  }),
});

export default api;

export const { useLazyGetConfigQuery, useSetConfigKeysMutation } = api;

// export all api endpoints

export const { getConfig, setConfigKeys } = api.endpoints;
