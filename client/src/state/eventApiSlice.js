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
      invalidatesTags: ["Events"],
    }),
    publishedEvents: build.query({
      query: () => `events/publishedEvents`,
      providesTags: ["Events"],
    }),
    unapprovedEvents: build.query({
      query: () => `events/unapprovedEvents`,
      providesTags: ["Events"],
    }),
    approvedEvents: build.query({
      query: () => `events/approvedEvents`,
      providesTags: ["Events"],
    }),
    approveEvent: build.mutation({
      query: (data) => ({
        url: `events/approveEvent`,
        method: "POST",
        body: data,
        formData: true,
      }),
      providesTags: ["Events"],
      invalidatesTags: ["Events"],
    }),
    deleteEvent: build.mutation({
      query: (data) => ({
        url: `events/deleteEvent`,
        method: "POST",
        body: data,
        formData: true,
      }),
      providesTags: ["Events"],
      invalidatesTags: ["Events"],
    }),
    togglePublish: build.mutation({
      query: (data) => ({
        url: `events/togglePublish`,
        method: "POST",
        body: data,
        formData: true,
      }),
      providesTags: ["Events"],
      invalidatesTags: ["Events"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  usePublishedEventsQuery,
  useUnapprovedEventsQuery,
  useApprovedEventsQuery,
  useApproveEventMutation,
  useDeleteEventMutation,
  useTogglePublishMutation,
} = eventApiSlice;
