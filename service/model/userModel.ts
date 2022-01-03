import { model, Schema } from 'mongoose';

export interface bucketUser {
    name: string,
    email: string,
    phoneNumber: number,
    password: string,
    confirmPassword: string,
    createdAt:any
}
export interface bucketLoginUser {
    email: string,
    password: string
}
const bucketUserData = new Schema<bucketUser>({
    name: {
        type: String,
        required: true,
        maxlength: 255
    },
    email: {
        type: String,
        required: true,
        maxlength: 255
    },
    phoneNumber: {
        type: Number,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    confirmPassword: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdAt: {
        type : Date,
        default : Date.now
    }
})

export const userDB = model<bucketUser>('user', bucketUserData)

