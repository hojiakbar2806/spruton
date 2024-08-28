import { SignJWT } from "jose";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// Secret key (use a secure and appropriate key in production)

const key = import.meta.env.VITE_JWT_SECRET_KEY;
const url = import.meta.env.VITE_API_URL;

const secretKey = new TextEncoder().encode(key);

// Function to create JWT in the browser
async function createJWT(initData) {
  return await new SignJWT({ ...initData })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secretKey);
}

// Create a base query instance for Redux Toolkit Query
const baseQuery = fetchBaseQuery({
  baseUrl: `${url}/api/`,
  prepareHeaders: async (headers, { getState }) => {
    const initData = window?.Telegram?.WebApp?.initData;
    const params = new URLSearchParams(initData);
    const user = JSON.parse(decodeURIComponent(params.get("user")));

    if (true) {
      // const token = await createJWT(user);
      const token =
        "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6NTA1MDE1MDQzMywiZmlyc3RfbmFtZSI6Ikhvamlha2JhcjIiLCJsYXN0X25hbWUiOiJOYXNyaWRkaW5vdiIsInVzZXJuYW1lIjoiaG9qaWFrYmFyXzA2MjgiLCJsYW5ndWFnZV9jb2RlIjoiZW4iLCJhbGxvd3Nfd3JpdGVfdG9fcG0iOnRydWV9.fJ1QvI_dUNuCTBjJWb_V0SpmAi2NWtfZsPnRdiUns4I";
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// If token expired or not valid - reauth user (Unauthorization error)
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error && result?.error?.status === 401) {
    localStorage.clear();
    sessionStorage.clear();
  }
  return result;
};

// Create an auto-generated hooks for each endpoint
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["user"],
  endpoints: (builder) => ({}),
});
