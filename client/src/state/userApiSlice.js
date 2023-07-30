import { api } from "./api";

export const userApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => `user/getUsers`,
      providesTags: ["users"],
    }),
  }),
});

export const { useGetUsersQuery } = userApiSlice;
