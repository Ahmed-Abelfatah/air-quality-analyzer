import { log } from "../utils/logger";
import chalk from "chalk";
import mongoose from "mongoose";

export const connectToMongoDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri)
    throw new Error("MONGODB_URI is not defined in environment variables");

  try {
    await mongoose.connect(uri);
    log(chalk.bgBlack.green("✅ Connected to MongoDB"));
  } catch (error: unknown) {
    log(chalk.bgBlack.red("❌ MongoDB connection error", error));
    process.exit(1);
  }
};
