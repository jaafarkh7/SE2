import { promises as fs } from "fs";
import { XMLParser } from "fast-xml-parser";

/**
 * Reads and parses an XML file into a JS object.
 * @param filepath path to the XML file
 * @returns Parsed JS object
 */
export async function readXML(filepath: string): Promise<any> {
  try {
    const content = await fs.readFile(filepath, "utf8");

    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "@_", // Attributes become @_attrName
    });

    return parser.parse(content);
  } catch (error) {
    throw new Error("Failed to read XML file: " + (error as Error).message);
  }
}

export default readXML;