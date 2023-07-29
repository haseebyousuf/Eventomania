import { api } from "./api";

export const committeeApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    committees: build.query({
      query: () => `committee/getCommittees`,
      providesTags: ["Committees"],
    }),
    addCommittee: build.mutation({
      query: (data) => ({
        url: `committee/addCommittee`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Committees"],
    }),
  }),
});

export const { useCommitteesQuery, useAddCommitteeMutation } =
  committeeApiSlice;
