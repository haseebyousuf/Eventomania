import { api } from "./api";

export const dashboardApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    adminDashboardStats: build.query({
      query: () => `dashboard/adminDashboardStats`,
      providesTags: ["Dashboard"],
    }),
    committeeDashboardStats: build.mutation({
      query: (data) => ({
        url: `dashboard/committeeDashboardStats`,
        method: "POST",
        body: data,
        formData: true,
      }),
      providesTags: ["Dashboard"],
      invalidatesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useAdminDashboardStatsQuery,
  useCommitteeDashboardStatsMutation,
} = dashboardApiSlice;
