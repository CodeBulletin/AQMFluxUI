import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomBaseQuery, getBaseURL, endpoints } from "./api";
import { AttributeType, MessageType } from "@/types/types";

const api = createApi({
  reducerPath: "attributeApi",
  baseQuery: CustomBaseQuery(getBaseURL(endpoints.attribute)),
  endpoints: (builder) => ({
    getAttributes: builder.query<AttributeType[], void>({
      query: () => ({
        url: "/",
        method: "GET",
        credentials: "include",
      }),
    }),
    createAttribute: builder.mutation<MessageType, AttributeType>({
      query: (body) => ({
        url: "/",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    updateAttribute: builder.mutation<AttributeType, AttributeType>({
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
  useLazyGetAttributesQuery,
  useCreateAttributeMutation,
  useUpdateAttributeMutation,
} = api;
export default api;
