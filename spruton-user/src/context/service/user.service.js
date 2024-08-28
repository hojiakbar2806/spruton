import { apiSlice } from "./api.service";

export const gift_serviceService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get my state - GET: /me
    getMe: builder.query({
      query: () => ({
        url: "/get/me",
        method: "GET",
      }),
      providesTags: ["gift_service"],
    }),

    // Get static lang - GET: /static/lang/{lang}
    getMyTask: builder.query({
      query: () => ({
        url: "/my/task",
        method: "GET",
      }),
      providesTags: ["gift_service"],
    }),

    // Get perform task - GET: /perform/task/29e098
    getPerformTask: builder.query({
      query: (id) => ({
        url: "/perform/task/" + id,
        method: "GET",
      }),
      providesTags: ["gift_service"],
    }),

    checkTask: builder.mutation({
      query: (id) => ({
        url: "/check/task/" + id,
        method: "PATCH",
      }),
      invalidatesTags: ["gift_service"],
    }),

    setWallet: builder.mutation({
      query: (body) => ({
        url: "/set/wallet",
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["gift_service"],
    }),
    openBox: builder.mutation({
      query: () => ({
        url: "/open/box",
        method: "PATCH",
      }),
      providesTags: ["gift_service"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetMyTaskQuery,
  useSetWalletMutation,
  useGetPerformTaskQuery,
  useCheckTaskMutation,
  useOpenBoxMutation,
} = gift_serviceService;
