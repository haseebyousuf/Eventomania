import { api } from "./api";

export const adminApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `admin/verify`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Admins"],
    }),
  }),
});

export const { useLoginMutation } = adminApiSlice;