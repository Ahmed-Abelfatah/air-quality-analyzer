import { AirQuality } from "../models/air-quality.model";

export default interface AirQualityRepositoy {
  saveData(data: AirQuality[]): Promise<void>;

  deleteAll(): Promise<void>;

  getDataByDateRange(startDate: Date, endDate: Date): Promise<AirQuality[]>;

  getTimeSeriesData(
    param: keyof AirQuality,
    limit: number,
  ): Promise<Partial<AirQuality>[]>;

  getDataByParameterAndDateRange(
    param: keyof AirQuality,
    startDate: Date,
    endDate: Date,
    limit: number,
  ): Promise<Partial<AirQuality>[]>;
}
