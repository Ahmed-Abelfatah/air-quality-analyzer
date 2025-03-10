import AirQualityRepositoy from "@/interfaces/air-quality-repository.interface";
import { AirQuality, AirQualityModel } from "@/models/air-quality.model";

export default class AirQualityMongoDataService implements AirQualityRepositoy {
  async saveData(data: AirQuality[]): Promise<void> {
    await AirQualityModel.insertMany(data);
  }

  async deleteAll(): Promise<void> {
    await AirQualityModel.deleteMany({});
  }
}
