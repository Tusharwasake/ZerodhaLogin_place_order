import mongoose from "mongoose";
import "dotenv/config";

const db = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("DATABASE CONNECTED Successfully ");
  } catch (error) {
    console.error("DATABASE CONNECTED failed", error.message);
    process.exit(1);
  }
};

export { db };
