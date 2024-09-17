// src/services/placeApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const placeApi = createApi({
  reducerPath: "placeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/auth/",
  }),
  endpoints: (builder) => ({
    postData: builder.mutation({
      query: (data) => ({
        url: "register",
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { usePostDataMutation } = placeApi;
