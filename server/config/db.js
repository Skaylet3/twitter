import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const urll = process.env.MONGO_URI;
        await mongoose.connect(urll);
        console.log('Base connected');
    } catch(err) {
        console.error('error: ', err.message);
        process.exit(1);
    }
};

export default connectDB;