import mongoose, { Schema } from "mongoose";

export interface AirQuality {
  date: Date;
  time: string;
  coGt: number;
  pt08S1Co: number;
  nmhcGt: number;
  c6h6Gt: number;
  pt08S2Nmhc: number;
  noxGt: number;
  pt08S3Nox: number;
  no2Gt: number;
  pt08S4No2: number;
  pt08S5O3: number;
  temperature: number;
  relativeHumidity: number;
  absoluteHumidity: number;
}

const AirQualitySchema = new Schema<AirQuality>({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  coGt: { type: Number, required: true },
  pt08S1Co: { type: Number, required: true },
  nmhcGt: { type: Number, required: true },
  c6h6Gt: { type: Number, required: true },
  pt08S2Nmhc: { type: Number, required: true },
  noxGt: { type: Number, required: true },
  pt08S3Nox: { type: Number, required: true },
  no2Gt: { type: Number, required: true },
  pt08S4No2: { type: Number, required: true },
  pt08S5O3: { type: Number, required: true },
  temperature: { type: Number, required: true },
  relativeHumidity: { type: Number, required: true },
  absoluteHumidity: { type: Number, required: true },
});

export const AirQualityModel = mongoose.model<AirQuality>(
  "AirQuality",
  AirQualitySchema,
);
