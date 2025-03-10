import dotenv from "dotenv";
import path from "path";
import { connectToMongoDB } from "@/database/mongoose";
import CsvParserService from "@/services/csv-parser.service";
import AirQualityDataService from "@/services/air-quality-data.service";
import AirQualityMongoDataService from "@/services/air-quality-mongo-data.service";
import chalk from "chalk";
import { log } from "@/utils/logger";

dotenv.config();
const repository = new AirQualityMongoDataService();
const airQualityDataService = new AirQualityDataService(repository);
const csvParserService = new CsvParserService(airQualityDataService);

async function seed() {
  try {
    await connectToMongoDB();

    await airQualityDataService.deleteAll();
    log(chalk.bgBlack.red("🧹 Existing data deleted  🚨"));
    await csvParserService.process(
      path.join(__dirname, "../data/AirQualityUCI.csv"),
    );
    log(chalk.bgBlack.green(`✅ Data has been Inserted successfully`));
    process.exit(0);
  } catch (error: unknown) {
    log(chalk.bgBlack.yellow(`❌ Failed to seed data: ${error}`));
  }
}

seed();
