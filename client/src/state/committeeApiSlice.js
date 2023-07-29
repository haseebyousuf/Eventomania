import { api } from "./api";

export const committeeApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    committees: build.query({
      query: () => `committee/get-committees`,
    }),
  }),
});

export const { useCommitteesQuery } = committeeApiSlice;
