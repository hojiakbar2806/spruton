import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { loading } from "./loading";
import openSliceReducer from "./slice/openSlice";
import { apiSlice } from "./service/api.service";

export const store = configureStore({
  reducer: combineReducers({
    loading: loading,
    open: openSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  }),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
