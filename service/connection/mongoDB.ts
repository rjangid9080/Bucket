import { connect } from "mongoose";

export const MongoDB = async () => {
    try {
        const connectDB: any = await connect(process.env.MONGO_URI as string)
        console.log(`MongoDB connected : ${connectDB.connection.host}`)
    } catch (error) {
        if (error instanceof Error) {
            console.log(error);
            process.exit(1);
        }
    }
}