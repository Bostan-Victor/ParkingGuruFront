import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const placeApiRegister = createApi({
  reducerPath: "placeApiRegister",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/auth/",
  }),
  endpoints: (builder) => ({
    postData: builder.mutation({
      query: (data) => ({
        url: "register",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "authenticate",
        method: "POST",
        body: data,
      }),
    }),
    generateOTP: builder.query({
      query: (phoneNumber) => ({
        url: `http://localhost:8080/api/phoneNumber/generateOTP`,
        method: "GET",
        params: {
          phoneNumber: phoneNumber,
        },
      }),
    }),
  }),
});

export const { usePostDataMutation, useLoginUserMutation, useGenerateOTPQuery } = placeApiRegister;
