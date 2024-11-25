import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomBaseQuery, getBaseURL, endpoints } from "./api";
import { LocationType, MessageType } from "@/types/types";

const api = createApi({
  reducerPath: "locationApi",
  baseQuery: CustomBaseQuery(getBaseURL(endpoints.location)),
  endpoints: (builder) => ({
    getLocations: builder.query<LocationType[], void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
      }),
    }),
    createLocation: builder.mutation<MessageType, LocationType>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    updateLocation: builder.mutation<LocationType, LocationType>({
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
  useLazyGetLocationsQuery,
  useCreateLocationMutation,
  useUpdateLocationMutation,
} = api;
export default api;
