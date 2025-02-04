import { baseApi } from "@/redux/api/baseApi";
import { TResponseRedux, TUserData } from "@/types";


const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUsers: builder.query({
            query: () => {
                return {
                    url: `/users`,
                };
            },
            transformResponse: (response: TResponseRedux<TUserData[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },

            providesTags: ["users"],
        }),
        updateUser: builder.mutation({
            query: (data) => {
                return {
                    url: `/users/${data.id}`,
                    method: "PATCH",
                    body: data.data,
                };
            },
            invalidatesTags: ["users"],
        }),
        deleteUser: builder.mutation({
            query: (id) => {
                return {
                    url: `/users/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["users"],
        }),
        getMe: builder.query({
            query: () => {
                return {
                    url: `/users/me`,
                };
            },
            transformResponse: (response: TResponseRedux<TUserData>) => {
                return response.data;
            },
            providesTags: ["userData"],
        }),
        updateProfile: builder.mutation({
            query: (data) => {
                return {
                    url: `/users/me`,
                    method: "PUT",
                    body: data,
                };
            },
            invalidatesTags: ["userData"],
        }),
    }),
});
export const {
useGetAllUsersQuery,
useGetMeQuery,
useUpdateProfileMutation,
useUpdateUserMutation,
useDeleteUserMutation,
}=userApi