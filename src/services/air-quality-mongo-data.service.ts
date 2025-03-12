import AirQualityRepositoy from "../interfaces/air-quality-repository.interface";
import { AirQuality, AirQualityModel } from "../models/air-quality.model";

export default class AirQualityMongoDataService implements AirQualityRepositoy {
  async saveData(data: AirQuality[]): Promise<void> {
    await AirQualityModel.insertMany(data);
  }

  async deleteAll(): Promise<void> {
    await AirQualityModel.deleteMany({});
  }

  async getTimeSeriesData(
    param: keyof AirQuality,
    limit: number = 100,
  ): Promise<Partial<AirQuality>[]> {
    return AirQualityModel.find({}, { _id: 0, date: 1, time: 1, [param]: 1 })
      .sort({ date: 1, time: 1 })
      .limit(limit)
      .lean();
  }

  async getDataByDateRange(start: Date, end: Date): Promise<AirQuality[]> {
    return AirQualityModel.find({
      date: {
        $gte: start,
        $lte: end,
      },
    })
      .sort({ date: 1, time: 1 })
      .lean();
  }
}
