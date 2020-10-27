import "regenerator-runtime";
import { get } from "./api";

jest.mock("../parser/parserData", () => ({
  parser: (data) => data,
}));

const data = {
  key: "value",
};

const error = {
  message: "error",
};

describe("Api Unit Test", () => {
  it("WHEN call get function THEN should return response", async () => {
    global.fetch = jest.fn((url) =>
      Promise.resolve({
        json: () => Promise.resolve({ ...data }),
      })
    ) as any;

    const response = await get({ query: "20201026", section: "euroJackpot" });
    expect(response).toEqual(data);
  });

  it("WHEN call get function THEN should return an error response", async () => {
    jest.spyOn(global.console, "error");
    global.fetch = jest.fn((url) => Promise.reject({ ...error })) as any;
    await get({ query: "20201026", section: "euroJackpot" });
    expect(console.error).toBeCalled();
  });
});
