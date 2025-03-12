import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import yaml from "yamljs";

export const setupSwaggerDocs = (app: Express) => {
  const swaggerDocument = yaml.load(__dirname + "/swagger.yml");
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};
