// src/services/placeApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const placeApi = createApi({
  reducerPath: "placeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://maps.googleapis.com/maps/api/place/",
  }),
  endpoints: (builder) => ({
    getPlaceAutocomplete: builder.query({
      query: ({ input, location, apiKey }) => ({
        url: "autocomplete/json",
        params: {
          input,
          key: apiKey,
          location,
          radius: 500,
        },
      }),
    }),
  }),
});

export const { useGetPlaceAutocompleteQuery } = placeApi;
