import { apiSlice } from "./api.service";

export const boxService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get my state - GET: /box
    box: builder.query({
      query: (query) => ({
        url: `/get/my/box?${query}`,
        method: "GET",
      }),
      providesTags: ["box"],
    }),

    // Add new box - POST: /box
    createBox: builder.mutation({
      query: (body) => ({
        url: "/create/box",
        method: "POST",
        body,
        formData: true,
      }),
      invalidatesTags: ["box"],
    }),

    // Get my state - GET: /box
    getBoxById: builder.query({
      query: (id) => ({
        url: `/get/box/${id}`,
        method: "GET",
      }),
      providesTags: ["box"],
    }),

    // update - PATCH: /box
    updateBox: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update/box/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["box"],
    }),

    updaetBoxLogo: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update/box/${id}/logo`,
        method: "PATCH",
        body: formData,
        formData: true,
      }),
      invalidatesTags: ["box"],
    }),

    updateBoxQuests: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/update/my/quest/${id}`,
        method: "PATCH",
        body: formData,
      }),
      invalidatesTags: ["box"],
    }),
  }),
});

export const {
  useBoxQuery,
  useCreateBoxMutation,
  useGetBoxByIdQuery,
  useUpdateBoxMutation,
  useUpdaetBoxLogoMutation,
  useUpdateBoxQuestsMutation,
} = boxService;
