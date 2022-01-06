import { Schema, model } from "mongoose";

export interface orderModel {
  shippingInfo: {
    address: string;
    city: string;
    state: string;
    country: string;
    pinCode: number;
    phoneNumber: number;
  };
  orderItems: {
    name: string;
    price: number;
    quantity: number;
    image: string;
    product: any;
  }[];
  user: any;
  paymentInfo: {
    id: string;
    status: string;
  };
  paidAt: any;
  itemsPrice: number;
  taxprice: number;
  shippingPrice: number;
  totalPrice: number;
  orderStatus: string;
  deliveredAt: any;
  createdAt: Date;
  updatedAt: Date;
}

export const order = model<orderModel>(
  "Order",
  new Schema(
    {
      shippingInfo: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
        pinCode: { type: Number, required: true },
        phoneNumber: { type: Number, required: true },
      },
      orderItems: [
        {
          name: { type: String, required: true },
          price: { type: Number, required: true },
          quantity: { type: Number, required: true },
          image: { type: String, required: true },
          product: {
            type: Schema.Types.ObjectId,
            ref: "product",
            required: true,
          },
        },
      ],
      user: { type: Schema.Types.ObjectId, ref: "user", required: true },
      paymentInfo: {
        id: { type: String, required: true },
        status: { type: String, required: true },
      },
      paidAt: { type: Date, required: true },
      itemsPrice: { type: Number, required: true },
      taxprice: { type: Number, required: true },
      shippingPrice: { type: Number, required: true },
      totalPrice: { type: Number, required: true },
      orderStatus: { type: String, required: true },
      deliveredAt: { type: Date, required: true },
    },
    { timestamps: true }
  )
);
