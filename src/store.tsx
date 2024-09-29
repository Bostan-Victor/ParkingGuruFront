// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import { placeApi } from "./services/placeApi";
import { placeApiRegister } from "./services/placeApiregister";

export const store = configureStore({
  reducer: {
    [placeApi.reducerPath]: placeApi.reducer,
    [placeApiRegister.reducerPath]: placeApiRegister.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(placeApi.middleware)
      .concat(placeApiRegister.middleware),
});
