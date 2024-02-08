import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:9000/api/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: (builder) => ({
    //regsiter
    register: builder.mutation<
      any,
      { firstName: string; lastName: string; password: string; email: string }
    >({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),

    // get reset token
    getToken: builder.mutation<any, { username: string }>({
      query: ({ username }) => ({
        url: `/user/generate-reset-token?user=${username}`,
        method: "GET",
      }),
    }),

    //reset
    resetUser: builder.mutation<any, { username: string; token: string }>({
      query: (body) => ({
        url: "/user/reset-user",
        method: "POST",
        body,
      }),
    }),

    //logout all
    logoutAll: builder.mutation<any, { username: string }>({
      query: ({ username }) => ({
        url: `/user/logout-all?username=${username}`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useGetTokenMutation,
  useResetUserMutation,
  useLogoutAllMutation,
} = authApi;
