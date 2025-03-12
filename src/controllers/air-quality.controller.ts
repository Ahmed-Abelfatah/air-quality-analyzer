import { Request, Response } from "express";
import { z } from "zod";
import AirQualityDataService from "../services/air-quality-data.service";
import AirQualityMongoDataService from "../services/air-quality-mongo-data.service";
import {
  HttpStatusCode,
  sendErrorResponse,
  sendSuccessResponse,
} from "../utils/api";

const repository = new AirQualityMongoDataService();
const airQualityService = new AirQualityDataService(repository);

const timeSeriesKeys = [
  "coGt",
  "c6h6Gt",
  "noxGt",
  "no2Gt",
  "temperature",
  "relativeHumidity",
  "absoluteHumidity",
] as const;

const timeSeriesSchema = z.object({
  parameter: z.enum(timeSeriesKeys),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 100))
    .refine((val) => !isNaN(val!) && val! > 0, {
      message: "Limit must be a positive number",
    }),
});

const dateRangeSchema = z.object({
  start: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Start must be a valid date (YYYY-MM-DD)",
  }),
  end: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "End must be a valid date (YYYY-MM-DD)",
  }),
});

export const getTimeSeriesData = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result = timeSeriesSchema.safeParse({
    parameter: req.params.parameter,
    limit: req.query.limit,
  });

  if (!result.success) {
    sendErrorResponse({ res, error: result.error.errors });
    return;
  }

  const { parameter, limit } = result.data;

  try {
    const data = await airQualityService.getTimeSeriesData(parameter, limit);
    sendSuccessResponse({ res, statusCode: HttpStatusCode.OK, data });
    return;
  } catch (err) {
    sendErrorResponse({ res, error: err });
    return;
  }
};

export const getDataByDateRange = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result = dateRangeSchema.safeParse(req.query);

  if (!result.success) {
    sendErrorResponse({ res, error: result.error.errors });
    return;
  }

  const { start, end } = result.data;

  try {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const data = await airQualityService.getDataByDateRange(startDate, endDate);
    sendSuccessResponse({ res, statusCode: HttpStatusCode.OK, data });
    return;
  } catch (err) {
    sendErrorResponse({ res, error: err });
    return;
  }
};
