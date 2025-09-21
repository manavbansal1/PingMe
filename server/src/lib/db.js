import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Successfully Connected to MongoDB ${mongoose.connection.host}`)
    } catch (error) {
        console.log('Error connecting to MongoDB', error)
    }
}