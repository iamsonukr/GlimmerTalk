import mongoose from "mongoose";


const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.DB_URL)
        if (connect) {
            console.log("DB Connected");
        }
    } catch (error) {
        console.error("Connection to db failed:", error.message);
    }
};

export { connectDB };
