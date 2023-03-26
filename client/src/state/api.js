import axios from "axios";

import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({baseUrl: process.env.REACT_APP_BASE_URL}),
  reducerPath: "adminApi",
  tagTypes: ["Committees"],
  endpoints: (build)=>({
    getCommittees: build.query({
      query:() =>`committee/get-committees`,
      providesTags: ["Committees"],
    })
  })
});


export const {useGetCommitteesQuery} =api;


