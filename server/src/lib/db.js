import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const MONGO_URI = process.env.MONGO_URI

export const connectDB = async () => {
    try{
        await mongoose.connect(MONGO_URI)
        console.log(`Successfully Connected to MongoDB ${mongoose.connection.host}`)
    } catch (error) {
        console.log('Error connecting to MongoDB', error)
    }
}