import DataParser from "./interfaces/data-parser.interface.js";
import CsvProcessor from "./services/csv-parser.service.js";

const csvProcessor = new CsvProcessor();

function processData<T>(parser: DataParser<T>, data: string) {
  return parser.parse(data);
}
processData(csvProcessor, "./src/data/AirQualityUCI.csv");
