import logger from "./util/logger";
import { readCsv } from "./util/parser";

async function main() {
  const data = await readCsv("data/input.csv");
  logger.info(data);
  }