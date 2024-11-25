import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomBaseQuery, getBaseURL, endpoints } from "./api";
import { OpenWeatherLocationType, GetLocationType } from "@/types/types";

const api = createApi({
  reducerPath: "openWeatherApi",
  baseQuery: CustomBaseQuery(getBaseURL(endpoints.weather)),
  endpoints: (builder) => ({
    getOpenWeatherLocation: builder.query<
      OpenWeatherLocationType[],
      GetLocationType
    >({
      query: ({ city, state, country, limit }) => {
        return {
          url: `Location`,
          method: "POST",
          params: {
            city,
            state,
            country,
            limit,
          },
          credentials: "include",
        };
      },
    }),
  }),
});

export default api;

export const { useLazyGetOpenWeatherLocationQuery } = api;
