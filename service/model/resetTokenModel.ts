import { model, Schema } from 'mongoose';

export interface resetToken{
    userId:string,
    resetToken:string,
    createdAt:any
}

export const token = model<resetToken>('resetToken',
    new Schema<resetToken>({
        userId:{
            type:String,
            required:true
        },
        resetToken:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now,
            expires:300
        }
    })
)