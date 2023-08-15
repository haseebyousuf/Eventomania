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
    committeeUnapprovedEvents: build.query({
      query: (data) => ({
        url: `events/committeeUnapprovedEvents`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Events"],
    }),
    approvedEvents: build.query({
      query: () => `events/approvedEvents`,
      providesTags: ["Events"],
    }),

    committeeApprovedEvents: build.query({
      query: (data) => ({
        url: `events/committeeApprovedEvents`,
        method: "POST",
        body: data,
      }),
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
    getEvent: build.query({
      query: (data) => ({
        url: `events/getEvent`,
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
    uploadReport: build.mutation({
      query: (data) => ({
        url: `event/uploadReport`,
        method: "POST",
        body: data,
        formData: true,
      }),
      providesTags: ["Events"],
      invalidatesTags: ["Events"],
    }),
    uploadPhotos: build.mutation({
      query: (data) => ({
        url: `event/uploadPhotos`,
        method: "POST",
        body: data,
        formData: true,
      }),
      providesTags: ["Events"],
      invalidatesTags: ["Events"],
    }),
    sendCertificates: build.mutation({
      query: (data) => ({
        url: `events/sendCertificate`,
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
  useCommitteeUnapprovedEventsQuery,
  useApprovedEventsQuery,
  useCommitteeApprovedEventsQuery,
  useGetEventQuery,
  useApproveEventMutation,
  useDeleteEventMutation,
  useTogglePublishMutation,
  useUploadReportMutation,
  useUploadPhotosMutation,
  useSendCertificatesMutation,
} = eventApiSlice;
