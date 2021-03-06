import { model, Schema } from "mongoose";

export interface productModel {
  name: string;
  description: string;
  price: number;
  rating: number;
  images: {
    public_id: string;
    url: string;
  }[];
  catagory: string;
  stock: number;
  numberOfReviews: number;
  reviews: {
    user: string;
    name: string;
    rating: string;
    comment: string;
  }[];
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

const bucketProductModel = new Schema<productModel>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    catagory: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      maxlength: [3, "Maxlength is 3"],
      default: 1,
      required: true,
    },
    numberOfReviews: {
      type: Number,
    },
    reviews: [
      {
        user: {
          type: String,
        },
        name: {
          type: String,
        },
        rating: {
          type: Number,
        },
        comment: {
          type: String,
        },
      },
    ],
    user: {
      type: String,
    },
  },
  { timestamps: true }
);

export const productDB = model<productModel>("product", bucketProductModel);
