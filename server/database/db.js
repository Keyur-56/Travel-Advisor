import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = `mongodb+srv://${USERNAME}:${PASSWORD}@room-chat.fa5bctn.mongodb.net/travelPlanner?retryWrites=true&w=majority&appName=Room-chat`;

const Connection = async () => {
  try {
    await mongoose.connect(URL);

    console.log("Database Connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default Connection;