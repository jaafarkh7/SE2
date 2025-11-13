import parseJSON from "../src/util/jsonparser";
import path from "path";

describe("JSON Parser", () => {

  const goodFile = path.join(__dirname, "data", "sample.json");

  test("should parse valid JSON and return a JS object", async () => {
    const result = await parseJSON(goodFile);
    expect(result.store.name).toBe("MiniMarket");
    expect(result.store.products.length).toBe(2);
  });
});
