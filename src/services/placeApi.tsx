import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for token management

export const placeApi = createApi({
  reducerPath: "placeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/", // Your GraphQL endpoint
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
    // New request for fetching user profile
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
  useGetUserProfileMutation
} = placeApi;
