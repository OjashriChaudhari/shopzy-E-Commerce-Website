import mongoose from "mongoose";

export const connectDB =async()=>{
    try{
        // await mongoose.connect('mongodb://127.0.0.1:27017/shopzyUserdata');
        await mongoose.connect(process.env.MONGO_URL);
        console.log('database connected')
    }catch(error){
        console.log('error in connecting', error)
        process.exit(1);
    }
} 