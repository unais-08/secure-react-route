import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `MonogoDB Connected: ${conn.connection.host}:${conn.connection.port}`
    );
  } catch (error) {
    console.log("Error connection to MonogDB: ", error.message);
    process.exit(1); //failure, 0 status code is success and 1 is for failure
  }
};
