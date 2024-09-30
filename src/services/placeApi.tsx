import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for token management

export const placeApi = createApi({
  reducerPath: "placeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/", // Your API endpoint
    prepareHeaders: async (headers) => {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    fetchIsUserPolice: builder.mutation({
      query: () => ({
        url: 'graphql',
        method: 'POST',
        body: JSON.stringify({
          query: `
            query {
              isUserPolice {
                success
                reservation {
                  id
                  startDateTime
                  endDateTime
                  plateNumber
                  address
                  status
                  user {
                    id
                    email
                    firstName
                    lastName
                    phoneNumber
                  }
                }
              }
            }
          `,
        }),
      }),
    }),
    postData: builder.mutation({
      query: (data) => ({
        url: "register",
        method: 'POST',
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "authenticate",
        method: 'POST',
        body: data,
      }),
    }),
    registerCar: builder.mutation({
      query: (input) => ({
        url: "graphql",
        method: 'POST',
        body: JSON.stringify({
          query: `
            mutation createReservation($input: CreateReservationInput!) {
              createReservation(input: $input) {
                id
                startDateTime
                endDateTime
                plateNumber
                address
                status
                user {
                  email
                  firstName
                  lastName
                }
              }
            }
          `,
          variables: { input },
        }),
      }),
    }),
    getReservation: builder.mutation({
      query: () => ({
        url: "graphql",
        method: 'POST',
        body: JSON.stringify({
          query: `
            query {
              getActiveReservation {
                success
                message
                elapsedTime
                reservation {
                  address
                  plateNumber
                }
              }
            }
          `,
        }),
      }),
    }),
    endReservation: builder.mutation({
      query: () => ({
        url: "graphql",
        method: 'POST',
        body: JSON.stringify({
          query: `
            mutation endReservation {
              endReservation {
                id
                plateNumber
                startDateTime
                endDateTime
                totalPrice
              }
            }
          `,
        }),
      }),
    }),
    getUserProfile: builder.mutation({
      query: () => ({
        url: "graphql",
        method: 'POST',
        body: JSON.stringify({
          query: `
            query {
              getUserProfile {
                firstName
                lastName
                email
                phoneNumber
              }
            }
          `,
        }),
      }),
    }),
    // Updated request to generate OTP via GET method with query parameter
    generateOTP: builder.mutation({
      query: (phoneNumber) => ({
        url: `api/phoneNumber/generateOTP?phoneNumber=${encodeURIComponent(phoneNumber)}`, // Passing phoneNumber as a query parameter
        method: 'GET', // Standard GET request
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
    // New request to get active reservation by plate number
    getActiveReservationByPlate: builder.mutation({
      query: (plateNumber) => ({
        url: "graphql",
        method: 'POST',
        body: JSON.stringify({
          query: `
            query activeReservationByPlateNum($plateNumber: String!) {
              activeReservationByPlate(plateNumber: $plateNumber) {
                success
                message
                elapsedTime
                reservation {
                  id
                  startDateTime
                  plateNumber
                  address
                  status
                }
                user {
                  id
                  email
                  firstName
                  lastName
                  phoneNumber
                }
              }
            }
          `,
          variables: { plateNumber },
        }),
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const { 
  useFetchIsUserPoliceMutation, 
  usePostDataMutation, 
  useLoginUserMutation, 
  useRegisterCarMutation, 
  useGetReservationMutation,
  useEndReservationMutation, 
  useGetUserProfileMutation,
  useGenerateOTPMutation,
  useGetActiveReservationByPlateMutation // Hook for fetching active reservation by plate number
} = placeApi;
