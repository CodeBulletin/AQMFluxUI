import { createApi } from "@reduxjs/toolkit/query/react";
import { CustomBaseQuery, getBaseURL, endpoints } from "./api";
import { NotificationType, MessageType } from "@/types/types";

const api = createApi({
  reducerPath: "messageAPI",
  baseQuery: CustomBaseQuery(getBaseURL(endpoints.message)),
  endpoints: (builder) => ({
    createMessages: builder.mutation<MessageType, Omit<NotificationType, "id">>(
      {
        query: (body) => ({
          url: "/",
          method: "POST",
          body,
          credentials: "include",
        }),
      }
    ),
    getMessages: builder.query<
      {
        id: number;
        title: string;
      }[],
      void
    >({
      query: () => ({
        url: "/all/",
        method: "GET",
        credentials: "include",
      }),
    }),
    getMessage: builder.query<NotificationType, number>({
      query: (id) => ({
        url: `/${id}/`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateMessage: builder.mutation<NotificationType, NotificationType>({
      query: (body) => ({
        url: `/`,
        method: "PUT",
        body,
        credentials: "include",
      }),
    }),
    deleteMessage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/${id}/`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateMessagesMutation,
  useLazyGetMessagesQuery,
  useLazyGetMessageQuery,
  useUpdateMessageMutation,
  useDeleteMessageMutation,
} = api;
export default api;
