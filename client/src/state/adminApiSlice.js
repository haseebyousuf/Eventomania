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
    convenors: build.query({
      query: () => `admin/convenors`,
      providesTags: ["Admins"],
    }),
    addConvenor: build.mutation({
      query: (data) => ({
        url: `admin/addConvenor`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Admins"],
      invalidatesTags: ["Admins"],
    }),
    deleteConvenor: build.mutation({
      query: (data) => ({
        url: `admin/deleteConvenor`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Admins"],
      invalidatesTags: ["Admins"],
    }),
    members: build.query({
      query: () => `admin/members`,
      providesTags: ["Admins"],
    }),
    addMember: build.mutation({
      query: (data) => ({
        url: `admin/addMember`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Admins"],
      invalidatesTags: ["Admins"],
    }),
    deleteMember: build.mutation({
      query: (data) => ({
        url: `admin/deleteMember`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Admins"],
      invalidatesTags: ["Admins"],
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: `admin/changePassword`,
        method: "POST",
        body: data,
      }),
      providesTags: ["Admins"],
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useLoginMutation,
  useConvenorsQuery,
  useAddConvenorMutation,
  useDeleteConvenorMutation,
  useMembersQuery,
  useAddMemberMutation,
  useDeleteMemberMutation,
  useChangePasswordMutation,
} = adminApiSlice;
