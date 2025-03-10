import AirQualityRepositoy from "@/interfaces/air-quality-repository.interface";
import { AirQuality } from "@/models/air-quality.model";

export default class AirQualityDataService {
  constructor(private repository: AirQualityRepositoy) {}

  saveData(data: AirQuality[]) {
    return this.repository.saveData(data);
  }

  deleteAll() {
    return this.repository.deleteAll();
  }
}
