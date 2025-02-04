
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateProps {
    car: string | null;
    quantity: number | null
    totalPrice: number | null
    isBooking: boolean,
   
}

const initialState: InitialStateProps = {
    car: null,
    quantity: null,
    totalPrice: null,
    isBooking: false,
    
  
};

export const orderSlice = createSlice({
    name: "orderData",
    initialState,
    reducers: {
        setOrderData: (state, action: PayloadAction<InitialStateProps>) => {
            const { car, totalPrice, quantity, isBooking  } = action.payload;
            state.car = car;
            state.totalPrice = totalPrice;
            state.quantity = quantity;
            state.isBooking = isBooking;
        },

        // removeRentalData: (state) => {
        //     state.bikeId = null;
        //     state.startTime = null;
        //     state.amount = null;
        //     state.isBooking = null;
        // },
    },
});

export const { setOrderData } = orderSlice.actions;

export default orderSlice.reducer;