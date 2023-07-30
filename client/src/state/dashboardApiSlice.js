import { api } from "./api";

export const dashboardApiSlice = api.injectEndpoints({
  endpoints: (build) => ({
    adminDashboardStats: build.query({
      query: () => `dashboard/adminDashboardStats`,
      providesTags: ["Dashboard"],
    }),
    // approveEvent: build.mutation({
    //   query: (data) => ({
    //     url: `events/approveEvent`,
    //     method: "POST",
    //     body: data,
    //     formData: true,
    //   }),
    //   providesTags: ["Events"],
    //   invalidatesTags: ["Events"],
    // }),
  }),
});

export const { useAdminDashboardStatsQuery } = dashboardApiSlice;
