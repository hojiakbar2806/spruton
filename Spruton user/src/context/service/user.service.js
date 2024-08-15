import { apiSlice } from "./api.service";

export const userService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get my state - GET: /me
    getMe: builder.query({
      query: () => ({
        url: "/get/me",
        method: "GET",
      }),
      providesTags: ["me"],
    }),

    // Get static lang - GET: /static/lang/{lang}
    getMyTask: builder.query({
      query: () => ({
        url: "/my/task",
        method: "GET",
      }),
    }),

    // Get perform task - GET: /perform/task/29e098
    getPerformTask: builder.query({
      query: (taskId) => ({
        url: `perform/task/${taskId}`,
        method: "GET",
      }),
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

export const {
  useGetMeQuery,
  useGetMyTaskQuery,
  useGetPerformTaskQuery,
  useSetWalletMutation,
} = userService;
