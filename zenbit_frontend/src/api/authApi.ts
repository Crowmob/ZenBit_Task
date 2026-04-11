import { authEndpoints, POST, PUT } from "../constants";
import { AuthRequest, ForgotPasswordRequest, ResetPasswordRequest, VerifyUserRequest } from "../types";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<{ token: string }, AuthRequest>({
      query: (body) => ({
        url: authEndpoints.login,
        method: POST,
        body
      })
    }),
    register: builder.mutation<undefined, AuthRequest>({
      query: (body) => ({
        url: authEndpoints.register,
        method: POST,
        body
      })
    }),
    logout: builder.mutation<undefined, void>({
      query: () => ({
        url: authEndpoints.logout,
        method: POST
      })
    }),
    forgotPassword: builder.mutation<undefined, ForgotPasswordRequest>({
      query: (body) => ({
        url: authEndpoints.forgotPassword,
        method: POST,
        body
      })
    }),
    resetPassword: builder.mutation<undefined, ResetPasswordRequest>({
      query: (body) => ({
        url: authEndpoints.resetPassword,
        method: PUT,
        body
      })
    }),
    verifyUser: builder.mutation<{ token: string }, VerifyUserRequest>({
      query: (body) => ({
        url: authEndpoints.verifyUser,
        method: PUT,
        body
      })
    })
  })
})

export const { 
  useLoginMutation, 
  useRegisterMutation, 
  useLogoutMutation,
  useForgotPasswordMutation, 
  useResetPasswordMutation,
  useVerifyUserMutation
} = authApi;