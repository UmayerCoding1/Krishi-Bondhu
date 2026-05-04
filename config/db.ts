import mongoose from "mongoose";

let cached = global.mongoose;

if (!process.env.MONGODB_URI!) {
    throw new Error("MONGODB_URI is missing");
}

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDB() {
    if (cached.conn) return cached.conn;
    console.log('MONGODB_URI', process.env.MONGODB_URI)
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.MONGODB_URI!);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}