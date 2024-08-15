import { loading } from "./loading";
import { apiSlice } from "./service/api.service";
import addBoxSliceReducer from "./slice/addBoxSlice";
import { configureStore, combineReducers } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: combineReducers({
    loading: loading,
    box: addBoxSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  }),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
