import mongoose from "mongoose"

const connectionStr = `mongodb+srv://teetwalhartik:hartik123456@cluster0.yuzgqpf.mongodb.net/Revision_mern?retryWrites=true&w=majority&appName=Cluster0`

export const connectDB = async() => {
    await mongoose.connect(connectionStr, { useNewUrlParser: true, useUnifiedTopology: true });
} 