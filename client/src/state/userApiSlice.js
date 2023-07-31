import { api } from "./api";

export const userApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: () => `user/getUsers`,
      providesTags: ["users"],
    }),
    registerFaculty: build.mutation({
      query: (data) => ({
        url: `user/registerFaculty`,
        method: "POST",
        body: data,
        formData: true,
      }),
      providesTags: ["users"],
    }),
    registerStudent: build.mutation({
      query: (data) => ({
        url: `user/registerStudent`,
        method: "POST",
        body: data,
        formData: true,
      }),
      providesTags: ["users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useRegisterFacultyMutation,
  useRegisterStudentMutation,
} = userApiSlice;
