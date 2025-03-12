import express from "express";
import dotenv from "dotenv";
import airQualityRoutes from "./routes/air-quality.route";
import { connectToMongoDB } from "./database/mongoose";
import { setupSwaggerDocs } from "./swagger";
import chalk from "chalk";
import { log } from "./utils/logger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/air-quality", airQualityRoutes);
setupSwaggerDocs(app);

connectToMongoDB().then(() => {
  app.listen(PORT, () => {
    log(
      chalk.bgBlack.green(`🚀 Server is running on http://localhost:${PORT}`),
    );
    log(
      chalk.bgBlack.green(
        `🚀 Swagger docs is running on http://localhost:${PORT}/docs`,
      ),
    );
  });
});
