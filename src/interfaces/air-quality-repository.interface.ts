import { AirQuality } from "@/models/air-quality.model";

export default interface AirQualityRepositoy {
  saveData(data: AirQuality[]): Promise<void>;
  deleteAll(): Promise<void>;
}
