import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types";
import { TCar } from "@/types/carType";


const carApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCars: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        if (item.value !== undefined) {
                            params.append(item.name, item.value as string);
                        }
                    });
                }
                return {
                    url: `/cars`,
                    method:"GET",
                    params: params,
                };
            },
            transformResponse: (response: TResponseRedux<TCar[]>) => {
                return {
                    data: response.data,
                    meta: response.meta,
                };
            },
            providesTags: ["cars"],
        }),
        // getBikeDetails: builder.query({
        //     query: (id) => {
        //         return {
        //             url: `/bikes/${id}`,
        //         };
        //     },
        //     transformResponse: (response: TResponseRedux<TCar>) => {
        //         return {
        //             data: response.data,
        //         };
        //     },
        //     providesTags: ["cars"],
        // }),
        // createBike: builder.mutation({
        //     query: (data) => {
        //         return {
        //             url: `/bikes`,
        //             method: "POST",
        //             body: data,
        //         };
        //     },
        //     transformResponse: (response: TResponseRedux<TCar>) => {
        //         return {
        //             data: response.data,
        //         };
        //     },
        //     invalidatesTags: ["cars"],
        // }),
        // updateBike: builder.mutation({
        //     query: (data) => {
        //         return {
        //             url: `/bikes/${data.id}`,
        //             method: "PUT",
        //             body: data.data,
        //         };
        //     },
        //     transformResponse: (response: TResponseRedux<TCar>) => {
        //         return {
        //             data: response.data,
        //         };
        //     },
        //     invalidatesTags: ["cars"],
        // }),
        // deleteBike: builder.mutation({
        //     query: (id) => {
        //         return {
        //             url: `/bikes/${id}`,
        //             method: "DELETE",
        //         };
        //     },
        //     invalidatesTags: ["cars"],
        // }),
    }),
});

export const {
    useGetAllCarsQuery
} = carApi;