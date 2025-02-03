import { TCar } from "./carType";

export type TOrder ={
    _id: string;
    email: string;
    car:TCar|  null | undefined;
    quantity: number;
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
  }