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

const MAX_LIMIT = 10000;
const MAX_DATE_RANGE_DAYS = 30;

const timeSeriesKeys = [
  "coGt",
  "c6h6Gt",
  "noxGt",
  "no2Gt",
  "temperature",
  "relativeHumidity",
  "absoluteHumidity",
  "pt08S1Co",
  "nmhcGt",
  "pt08S2Nmhc",
  "pt08S3Nox",
  "pt08S4No2",
  "pt08S5O3",
] as const;

const timeSeriesSchema = z.object({
  parameter: z.enum(timeSeriesKeys),
  limit: z
    .preprocess(
      (val) => parseInt(val as string, 10),
      z
        .number()
        .int()
        .positive()
        .max(MAX_LIMIT, `Limit must be less than or equal to ${MAX_LIMIT}`),
    )
    .optional()
    .default(100),
});

const dateRangeSchema = z
  .object({
    start: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Start must be a valid date (YYYY-MM-DD)",
    }),
    end: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "End must be a valid date (YYYY-MM-DD)",
    }),
  })
  .refine(({ start, end }) => new Date(start) <= new Date(end), {
    message: "Start date must be before or equal to end date",
    path: ["start"],
  })
  .refine(
    ({ start, end }) => {
      const daysDiff = Math.ceil(
        (Date.parse(end) - Date.parse(start)) / (1000 * 60 * 60 * 24),
      );
      return daysDiff <= MAX_DATE_RANGE_DAYS;
    },
    {
      message: `Date range must be less than or equal to ${MAX_DATE_RANGE_DAYS} days`,
      path: ["end"],
    },
  );

export const getTimeSeriesData = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const result = timeSeriesSchema.safeParse({
    parameter: req.params.parameter,
    limit: req.query.limit,
  });

  if (!result.success) {
    sendErrorResponse({ res, error: result.error });
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
    sendErrorResponse({ res, error: result.error });
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

export const getDataByParameterAndDateRange = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const paramValidation = timeSeriesSchema.safeParse({
    parameter: req.params.parameter,
    limit: req.query.limit,
  });

  const dateValidation = dateRangeSchema.safeParse(req.query);
  if (!paramValidation.success) {
    sendErrorResponse({ res, error: paramValidation.error });
    return;
  }
  if (!dateValidation.success) {
    sendErrorResponse({ res, error: dateValidation.error });
    return;
  }

  const { parameter, limit } = paramValidation.data;
  const { start, end } = dateValidation.data;

  try {
    const startDate = new Date(start);
    const endDate = new Date(end);

    const data = await airQualityService.getDataByParameterAndDateRange(
      parameter,
      startDate,
      endDate,
      limit,
    );

    sendSuccessResponse({ res, statusCode: HttpStatusCode.OK, data });
  } catch (err) {
    sendErrorResponse({ res, error: err });
  }
};
