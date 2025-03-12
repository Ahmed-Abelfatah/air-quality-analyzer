import { AirQuality } from "../models/air-quality.model";

export default interface AirQualityRepositoy {
  saveData(data: AirQuality[]): Promise<void>;
  deleteAll(): Promise<void>;
  getDataByDateRange(start: Date, end: Date): Promise<AirQuality[]>;
  getTimeSeriesData(
    param: keyof AirQuality,
    limit: number,
  ): Promise<Partial<AirQuality>[]>;
}
