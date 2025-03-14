import AirQualityRepositoy from "../interfaces/air-quality-repository.interface";
import { AirQuality } from "../models/air-quality.model";

export default class AirQualityDataService {
  constructor(private repository: AirQualityRepositoy) {}

  saveData(data: AirQuality[]) {
    return this.repository.saveData(data);
  }

  deleteAll() {
    return this.repository.deleteAll();
  }

  getDataByDateRange(start: Date, end: Date) {
    return this.repository.getDataByDateRange(start, end);
  }

  getTimeSeriesData(
    parameter: keyof AirQuality,
    limit: number,
  ): Promise<Partial<AirQuality>[]> {
    return this.repository.getTimeSeriesData(parameter, limit);
  }

  getDataByParameterAndDateRange(
    parameter: keyof AirQuality,
    startDate: Date,
    endDate: Date,
    limit: number,
  ): Promise<Partial<AirQuality>[]> {
    return this.repository.getDataByParameterAndDateRange(
      parameter,
      startDate,
      endDate,
      limit,
    );
  }
}
