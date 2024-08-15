import { apiSlice } from "./api.service";

export const questService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get my state - GET: /quest
    quest: builder.query({
      query: () => ({
        url: "/get/quest",
        method: "GET",
      }),
      providesTags: ["quest"],
    }),

    // get by id - GET: /quest/{id}
    getQuestById: builder.query({
      query: (id) => ({
        url: `get/my/quest/${id}`,
        method: "GET",
      }),
      providesTags: ["quest"],
    }),
  }),
});

export const { useQuestQuery, useGetQuestByIdQuery } = questService;
