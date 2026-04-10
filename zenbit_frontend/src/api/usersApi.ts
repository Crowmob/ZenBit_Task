import { usersEndpoints } from "../constants";
import type { GetMeRequest } from "../types";
import { baseApi } from "./baseApi";

export const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<undefined, GetMeRequest>({
      query: ({ fingerprint }) => ({
        url: usersEndpoints.me,
        params: { fingerprint }
      })
    }),
  }),
});

export const { useGetMeQuery } = usersApi;