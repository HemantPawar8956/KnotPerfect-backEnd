import mongoose from "mongoose";

let connectionEstablished;
export const connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    const connection = mongoose.connection;
    console.log("Database is connected");
    return connectionEstablished;
  } catch (error) {
    console.log("There is error in database connection");
  }
};

export const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    console.log("database is disconnected");
  } catch (error) {}
};
