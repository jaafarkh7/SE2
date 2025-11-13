import parseXML from "../src/util/xmlparser";
import path from "path";

describe("XML Parser", () => {

  const goodFile = path.join(__dirname, "data", "sample.xml");

  test("should parse valid XML and return a JS object", async () => {
    const result = await parseXML(goodFile);
    expect(result.store.name).toBe("MiniMarket");
    expect(result.store.products.product.length).toBe(2);
  });
});
