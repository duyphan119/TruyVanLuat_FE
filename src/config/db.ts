import mongoose from "mongoose";

const dbConnect = () => {
  try {
    mongoose.connect(`${process.env.DATABASE_URL}${process.env.DATABASE_NAME}`);
    console.log("Connect Database OK");
  } catch (error) {
    console.log("Connect Database Fail", error);
  }
};

export default dbConnect;
