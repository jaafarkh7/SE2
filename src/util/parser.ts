import { promises as fs } from "fs";
import {parse as csvParse} from "csv-parse";
import {stringify as csvStringify} from "csv-stringify/sync";

/**
 * Read a CSV file and parse it into a 2D array of strings.
 * Supports RFC4180-style quoting (fields may be quoted; quotes escaped by doubling).
 * @param filepath filesystem path to the CSV file
 * @returns Promise resolving to an array of rows, each row an array of fields (strings)
 */
export async function readCsv(filepath: string, includeHeader: boolean = false): Promise<string[][]> {
    try {
    const fileContent = await fs.readFile(filepath, "utf8");
    return new Promise((resolve, reject) => {
        csvParse(fileContent, {
            trim: true,
            skipEmptyLines: true,
        }, (err, records: string[][]) => {
            if (err) { reject(err); } 
            if (!includeHeader)  records.shift();
                resolve(records);
        }
    )
        });
    } catch (error) {
        throw new Error("Failed to read CSV file: " + (error as Error).message);
    }
}


/**
 * Write a 2D string array to a CSV file.
 * Fields containing commas, quotes, CR or LF will be quoted; quotes inside fields are escaped by doubling.
 * Ensures parent directory exists.
 * @param filepath destination path
 * @param data 2D array of strings (rows)
 */
export async function writeCSVFile(filepath: string, data: string[][]): Promise<void> {
     try {
    const csvContent = csvStringify(data);
    await fs.writeFile(filepath, csvContent, "utf8");
  } catch (error) {
    throw new Error("Failed to write CSV file: " + (error as Error).message);
  }
}
