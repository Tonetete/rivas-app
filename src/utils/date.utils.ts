const numberDaysPerWeek = 7;

type WeekDayType =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface FormattedOptionProp {
  value: string;
  display: string;
}

export interface WeekDayDateProp {
  numberOfWeeksUntilCurrentDate: number;
  weekDay: WeekDayType;
}

export const formatDate = (date: Date): FormattedOptionProp => {
  let displayDate = "";
  let valueDate = "";
  displayDate +=
    date.getDate() < 10 ? `0${date.getDate()}-` : `${date.getDate()}-`;
  displayDate +=
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}-`
      : `${date.getMonth() + 1}-`;
  displayDate += `${date.getFullYear()}`;
  valueDate = displayDate.split("-").reverse().join("");
  return { display: displayDate, value: valueDate };
};

const getNumberWeekDay = (day: string): number => {
  switch (day) {
    case "MONDAY":
      return 1;
    case "TUESDAY":
      return 2;
    case "WEDNESDAY":
      return 3;
    case "THURSDAY":
      return 4;
    case "FRIDAY":
      return 5;
    case "SATURDAY":
      return 6;
    case "SUNDAY":
      return 7;
  }
};

const getFirstDayOfTheWeek = (date) => date.getDate() - date.getDay();

export const getWeekDaysDates = ({
  numberOfWeeksUntilCurrentDate,
  weekDay,
}: WeekDayDateProp): Date[] => {
  const currentDate = new Date(Date.now());
  currentDate.setDate(currentDate.getDate());
  const currentDayOfTheWeek =
    currentDate.getDay() % numberDaysPerWeek === 0
      ? numberDaysPerWeek
      : currentDate.getDay();

  const numberWeekDay = getNumberWeekDay(weekDay.toUpperCase());
  const intervalDays = currentDayOfTheWeek - numberWeekDay;
  const dates = [];

  if (intervalDays >= 0) {
    const date = new Date(currentDate);
    date.setDate(currentDate.getDate() - intervalDays);
    dates.push(date);
  }

  for (let index = 1; index <= numberOfWeeksUntilCurrentDate; index++) {
    const date = new Date();
    date.setDate(
      intervalDays >= 0
        ? currentDate.getDate() - numberDaysPerWeek
        : currentDate.getDate()
    );
    date.setDate(
      getFirstDayOfTheWeek(date) - numberDaysPerWeek * index + numberWeekDay
    );
    dates.push(date);
  }
  return dates;
};
