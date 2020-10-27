import { getWeekDaysDates } from "./date.utils";

const params = {
  numberOfWeeksUntilCurrentDate: 3,
  weekDay: "FRIDAY" as const,
};

const CurrentDate = Date.now;

describe("ParserData Unit Test", () => {
  afterAll(() => {
    global.Date.now = CurrentDate;
  });

  it("WHEN call getWeekDaysDates and current day is friday function THEN should return a number of dates provided plus one", () => {
    global.Date.now = jest.fn(() => new Date("2020-10-23T10:00:00Z").getTime());
    const parsedDates = getWeekDaysDates({ ...params });

    expect(parsedDates.length).toBe(4);
    expect(parsedDates[0].getDate()).toBe(
      new Date("2020-10-23T10:00:00Z").getDate()
    );
  });

  it("WHEN call getWeekDaysDates and current day is sunday function THEN should return a number of dates provided plus one", () => {
    global.Date.now = jest.fn(() => new Date("2020-10-25T10:00:00Z").getTime());
    const parsedDates = getWeekDaysDates({ ...params });

    expect(parsedDates.length).toBe(4);
    expect(parsedDates[0].getDate()).toBe(
      new Date("2020-10-23T10:00:00Z").getDate()
    );
  });

  it("WHEN call getWeekDaysDates and current day is thursday function THEN should return a number of dates provided by interval value", () => {
    global.Date.now = jest.fn(() => new Date("2020-10-22T10:00:00Z").getTime());
    const parsedDates = getWeekDaysDates({ ...params });

    expect(parsedDates.length).toBe(3);
    expect(parsedDates[0].getDate()).toBe(
      new Date("2020-10-16T10:00:00Z").getDate()
    );
  });
});
