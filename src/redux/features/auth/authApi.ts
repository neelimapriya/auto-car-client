import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => {
        return {
          url: "/auth/register",
          body: data,
          method: "POST",
        };
      },
    }),
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
  }),
});
export const { useLoginMutation,useRegisterUserMutation } = authApi;
