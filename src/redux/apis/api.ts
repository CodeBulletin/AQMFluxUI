import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query";

import { CustomBaseQueryType } from "@/types/types";

export const API = "http://localhost:8080/api/v1";

export const endpoints = {
  weather: "/weather",
  config: "/config",
  attribute: "/attribute",
  location: "/location",
  sensor: "/sensor",
  device: "/device",
};

export const getBaseURL = (endpoint: string): CustomBaseQueryType => ({
  baseUrl: `${API}${endpoint}`,
});

export const CustomBaseQuery = (endpoint: CustomBaseQueryType) => {
  const fn: BaseQueryFn<
    string | FetchArgs, // Argument type for queries/mutations
    unknown, // Result type
    FetchBaseQueryError // Error type
  > = async (args: any, api, extraOptions) => {
    const baseQuery = fetchBaseQuery({
      baseUrl: endpoint.baseUrl,
    });

    const result = await baseQuery(args, api, extraOptions);

    if (result.error) {
      // if the error is a 401, goto to login
      if (result.error.status === 401) {
        window.location.href = "/login";
      }
    }

    return result;
  };

  return fn;
};
