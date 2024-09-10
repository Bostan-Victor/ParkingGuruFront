// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { placeApi } from "./services/placeApi";

export const store = configureStore({
  reducer: {
    [placeApi.reducerPath]: placeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(placeApi.middleware),
});
