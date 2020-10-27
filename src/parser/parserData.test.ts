import { parser } from "./parserData";
import { getData } from "./__mocks__/data";

describe("ParserData Unit Test", () => {
  it("WHEN call parser function THEN should return data parsed", () => {
    const data = getData();
    const parsedData = parser(data, "euroJackpot");

    expect(parsedData.rows).toBeDefined();
    expect(parsedData.columns).toBeDefined();

    expect(parsedData.columns[0].id).toBe("tier");
    expect(parsedData.columns[1].id).toBe("match");
    expect(parsedData.columns[2].id).toBe("winners");
    expect(parsedData.columns[3].id).toBe("prize");
  });
});
