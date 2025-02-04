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
          method: "GET",
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

    // Fetch  single car
    getSingleCar: builder.query({
      query: (carId: string) => {
        console.log(carId);
        return{
       
          url: `/cars/${carId}`,
          method: "GET",
        }
      }
       , 
      providesTags: ["cars"],
    }),


    createCar: builder.mutation({
      query: (data) => {
        return {
          url: `/cars`,
          method: "POST",
          body: data,
        };
      },
      transformResponse: (response: TResponseRedux<TCar>) => {
        return {
          data: response.data,
        };
      },
      invalidatesTags: ["cars"],
    }),
    updateCars: builder.mutation({
      query: (data) => {
        return {
          url: `/cars/${data.id}`,
          method: "PUT",
          body: data.data,
        };
      },
      transformResponse: (response: TResponseRedux<TCar>) => {
        return {
          data: response.data,
        };
      },
      invalidatesTags: ["cars"],
    }),
    deleteCars: builder.mutation({
      query: (id) => {
        return {
          url: `/cars/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["cars"],
    }),
  }),
});

export const {
  useGetAllCarsQuery,
  useCreateCarMutation,
  useGetSingleCarQuery,
  useDeleteCarsMutation,
} = carApi;
