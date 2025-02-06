import { TCar } from "./carType";

export type TOrder ={
    _id: string;
    email: string;
    car:TCar|  null | undefined;
    quantity: number;
    totalPrice: number;
   orderPayment: 'paid' | 'unpaid'
    createdAt: Date;
    updatedAt: Date;
  }