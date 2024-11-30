import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomBaseQuery, getBaseURL, endpoints } from "./api";
import { Operator } from "@/types/types";

const api = createApi({
  reducerPath: "operatorApi",
  baseQuery: CustomBaseQuery(getBaseURL(endpoints.operator)),
  endpoints: (builder) => ({
    getOperators: builder.query<Operator[], void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
      }),
    }),
  }),
});

export const { useLazyGetOperatorsQuery } = api;

export default api;
