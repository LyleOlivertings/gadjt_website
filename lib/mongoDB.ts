import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
    mongoose.set("strictQuery", true) 

    if (isConnected) {
        console.log("DB connection already established");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL || "", {
          dbName: "gadjt_store"
        })

        isConnected = true;
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err);
    }
}