import { apiSlice } from "./api.service";

export const userService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get my state - GET: /box
    userMe: builder.query({
      query: () => ({
        url: "/get/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    setWallet: builder.mutation({
      query: (body) => ({
        url: "/set/wallet",
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useUserMeQuery, useSetWalletMutation } = userService;
