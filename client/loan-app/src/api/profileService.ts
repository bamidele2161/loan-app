import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = "http://localhost:9000/api/";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),

  endpoints: (builder) => ({
    //about
    about: builder.mutation<
      any,
      {
        phone: string;
        kinName: string;
        occupation: string;
        kinPhone: string;
        email: string;
      }
    >({
      query: (body) => ({
        url: "/add-profile",
        method: "POST",
        body,
      }),
    }),

    //address
    address: builder.mutation<
      any,
      { state: string; lga: string; town: string; dob: string; email: string }
    >({
      query: (body) => ({
        url: "/add-profile",
        method: "POST",
        body,
      }),
    }),

    //bvn
    verifyBvn: builder.mutation<
      any,
      { bvn: string; email: string; lastname: string; firstname: string }
    >({
      query: (body) => ({
        url: "/verifybvn",
        method: "POST",
        body,
      }),
    }),

    //pin
    pin: builder.mutation<any, { transactionPin: string; email: string }>({
      query: (body) => ({
        url: "/pin",
        method: "POST",
        body,
      }),
    }),
    //getProfile
    getProfile: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: "/getProfile",
        method: "POST",
        body,
      }),
    }),

    //requestLoan
    requestLoan: builder.mutation<
      any,
      {
        amount: string;
        firstguarantor: string;
        guarantoremail: string;
        secguarantor: string;
        secguarantoremail: string;
        duration: string;
        bankname: string;
        accountname: string;
        accountno: string;
        bankStatement: string;
      }
    >({
      query: (body) => ({
        url: "/request",
        method: "POST",
        body,
      }),
    }),

    //getProfile
    getloan: builder.mutation<any, { email: string }>({
      query: (body) => ({
        url: "/loandata",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useAboutMutation,
  useAddressMutation,
  useVerifyBvnMutation,
  usePinMutation,
  useGetProfileMutation,
  useRequestLoanMutation,
  useGetloanMutation,
} = profileApi;
