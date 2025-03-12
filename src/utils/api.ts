import { Response } from "express";
import { ZodError } from "zod";

export enum HttpStatusCode {
  BadRequest = 400,
  InternalServerError = 500,
  OK = 200,
}

export const sendErrorResponse = ({
  res,
  error,
}: {
  res: Response;
  error: unknown;
}) => {
  if (error instanceof ZodError) {
    return res
      .status(HttpStatusCode.BadRequest)
      .json({ success: false, error: error.errors });
  }
  // TODO: implement datadog/sentry integration to log this kind of errors
  return res.status(HttpStatusCode.InternalServerError).json({
    success: false,
    error: [`An unexpected error occurred: ${error}`],
  });
};

export const sendSuccessResponse = ({
  res,
  statusCode,
  data,
}: {
  res: Response;
  statusCode: number;
  data: unknown;
}) => {
  return res.status(statusCode).json({ success: true, data });
};
