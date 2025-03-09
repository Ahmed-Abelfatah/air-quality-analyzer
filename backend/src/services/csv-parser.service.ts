import { parse as CsvParse } from "csv-parse";
import chalk from "chalk";
import fs from "fs";
import DataParser from "@/interfaces/data-parser.interface";
// eslint-disable-next-line no-console
const log = console.log;

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

  private trimAndFilterCsvHeaders(header: string[]) {
    return header
      .map((item: string) => item.trim())
      .filter((item: string) => item.length > 0);
  }

  async parse(filePath: string): Promise<Record<string, unknown>> {
    let count = 0;
    let batch = [];
    return new Promise((resolve, reject) => {
      fs.createReadStream(filePath).pipe(
        CsvParse({
          columns: this.trimAndFilterCsvHeaders,
          ...this.CsvParserOptions,
        })
          .on("data", (row) => {
            batch.push(row);
            if (batch.length === this.batchSize) {
              log(chalk.bgBlack.green(`✅ Inserted ${this.batchSize} records`));
              batch = [];
            }
            count += 1;
          })
          .on("end", () => {
            if (batch.length > 0) {
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
            resolve({});
          })
          .on("error", (err) => {
            //TODO: integrate with sentry or dataDog
            reject(err);
          }),
      );
    });
  }
}
