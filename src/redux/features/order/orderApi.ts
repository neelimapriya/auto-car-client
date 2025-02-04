import { baseApi } from "@/redux/api/baseApi";

const orderApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        createPost: builder.mutation({
            query: (data) => {
                return {
                    url: `/orders`,
                    body: data,
                    method: "POST",
                };
            },
            invalidatesTags: ["orders", "cars"],
        }),
    })
})