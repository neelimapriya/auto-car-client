import { baseApi } from "@/redux/api/baseApi";
import { TQueryParam, TResponseRedux } from "@/types";
import { TOrder } from "@/types/orderType";

const transactionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      placeOrder: builder.mutation({
        query: (payload) => ({
          url: "/orders",
          method: "POST",
          body: payload,
        }),
      }),


       fetchOrders: builder.query({
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
                url: `/orders`,
                method: "GET",
                params: params,
              };
            },
            transformResponse: (response: TResponseRedux<TOrder[]>) => {
              return {
                data: response.data,
                meta: response.meta,
              };
            },
            providesTags: ["orders"],
          }),


      fetchCustomerOrders: builder.query({
        query: (email) => ({
          url: `/orders/${email}`,
          method: "GET",
        }),
        providesTags: ["orders"],
      }),
    //   confirmOrder: builder.query({
    //     query: (order_id) => ({
    //       url: "/orders/verify",
    //       params: { order_id },
    //       method: "GET",
    //     }),
    //   }),
      modifyShippingStatus: builder.mutation({
        query: (payload) => ({
          url: "/orders/update-status",
          method: "PATCH",
          body: payload,
        }),
        invalidatesTags: ["orders"],
      }),
      getTotalRevenue: builder.query({
        query: () => ({
          url: "/orders/revenue",
          method: "GET",
        }),
        providesTags: (result) => result ? ["orders"] : [],
      }),
      
    }),
  });

  export const {
    usePlaceOrderMutation,
    useGetTotalRevenueQuery,
    useFetchCustomerOrdersQuery,
    useFetchOrdersQuery,
    useModifyShippingStatusMutation,
  } = transactionApi;
