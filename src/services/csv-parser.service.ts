import { parse as CsvParse } from "csv-parse";
import chalk from "chalk";
import fs from "fs";
import DataParser from "../interfaces/data-parser.interface";
import { log } from "../utils/logger";
import AirQualityRepositoy from "../interfaces/air-quality-repository.interface";
import { AirQuality } from "../models/air-quality.model";

export default class CsvProcessor
  implements DataParser<Record<string, unknown>>
{
  private readonly CsvParserOptions: Record<string, string | boolean> = {
    skip_empty_lines: true,
    delimiter: ";",
    relax_column_count: true,
    skip_records_with_empty_values: true,
    trim: true,
  };

  private readonly batchSize: number = 1000;
  private readonly dataRepository: AirQualityRepositoy;

  constructor(dataRepository: AirQualityRepositoy) {
    this.dataRepository = dataRepository;
  }

  private trimAndFilterCsvHeaders(header: string[]) {
    return header
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);
  }

  async process(filePath: string): Promise<Record<string, unknown>> {
    let count = 0;
    let batch: AirQuality[] = [];
    return new Promise((resolve, reject) => {
      const stream = fs.createReadStream(filePath);
      const parser = CsvParse({
        columns: this.trimAndFilterCsvHeaders,
        ...this.CsvParserOptions,
      });
      stream.pipe(parser);
      parser
        .on("data", (row) => {
          stream.pause();
          const mappedRow = this.mapRawDataToDatabaseRow(row);
          batch.push(mappedRow);
          if (batch.length === this.batchSize) {
            this.dataRepository.saveData(batch);
            log(chalk.bgBlack.green(`✅ Inserted ${this.batchSize} records`));
            batch = [];
          }
          count += 1;
          stream.resume();
        })
        .on("end", () => {
          if (batch.length > 0) {
            this.dataRepository.saveData(batch);
            log(
              chalk.bgBlack.green(
                `✅ Inserted remaining ${batch.length} records`,
              ),
            );
          }
          log(
            chalk.bgBlack.green(
              `✅ Total parsed records: ${count} record${count !== 1 ? "s" : ""} 📄`,
            ),
          );
          resolve({
            success: true,
            message: "Data has been processed successfully",
          });
        })
        .on("error", (err) => {
          //TODO: integrate with sentry or dataDog
          reject(err);
        });
    });
  }

  private parseCommaSeparatedNumber(value: string): number {
    return parseFloat(value.replace(",", "."));
  }

  private mapRawDataToDatabaseRow(rawData: Record<string, string>): AirQuality {
    const [day, month, year] = rawData.Date.split("/").map(Number);
    const dateObj = new Date(year, month - 1, day);
    return {
      date: dateObj,
      time: rawData.Time,
      coGt: this.parseCommaSeparatedNumber(rawData["CO(GT)"]),
      pt08S1Co: parseInt(rawData["PT08.S1(CO)"]),
      nmhcGt: parseInt(rawData["NMHC(GT)"]),
      c6h6Gt: this.parseCommaSeparatedNumber(rawData["C6H6(GT)"]),
      pt08S2Nmhc: parseInt(rawData["PT08.S2(NMHC)"]),
      noxGt: parseInt(rawData["NOx(GT)"]),
      pt08S3Nox: parseInt(rawData["PT08.S3(NOx)"]),
      no2Gt: parseInt(rawData["NO2(GT)"]),
      pt08S4No2: parseInt(rawData["PT08.S4(NO2)"]),
      pt08S5O3: parseInt(rawData["PT08.S5(O3)"]),
      temperature: this.parseCommaSeparatedNumber(rawData.T),
      relativeHumidity: this.parseCommaSeparatedNumber(rawData.RH),
      absoluteHumidity: this.parseCommaSeparatedNumber(rawData.AH),
    };
  }
}
