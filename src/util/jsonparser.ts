
import { promises as fs } from "fs";

export default async function parseJSON(filePath: string) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    return JSON.parse(content);
  } catch (error) {
    throw new Error("Error parsing JSON file: " + (error as Error).message);
  }
}