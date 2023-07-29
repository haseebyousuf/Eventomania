import { api } from "./api";

export const eventApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    createEvent: build.mutation({
      query: (data) => ({
        url: `event/createEvent`,
        method: "POST",
        body: data,
        formData: true,
      }),
      providesTags: ["Events"],
    }),
    publishedEvents: build.query({
      query: () => `events/getPublishedEvents`,
      providesTags: ["Events"],
    }),
  }),
});

export const { useCreateEventMutation, usePublishedEventsQuery } =
  eventApiSlice;
