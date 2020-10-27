const numberDaysPerWeek = 7;
const fridayNumberDay = 5;

type WeekDayType = "MONDAY" | "TUESDAY" | "WEDNESDAY" | "THURSDAY" | "FRIDAY";

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

const getNumberWeekDay = (day: string) => {
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
      return 0;
  }
};

export const getWeekDaysDates = ({
  numberOfWeeksUntilCurrentDate,
  weekDay,
}: WeekDayDateProp): Date[] => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate());
  const currentDayOfTheWeek = currentDate.getDay();
  const dates = [];
  if (currentDayOfTheWeek - fridayNumberDay === 0) {
    dates.push(currentDate);
  }

  const intervalOfDaysBetweenCurrentAndFriday =
    currentDayOfTheWeek === 0
      ? 2
      : currentDayOfTheWeek - getNumberWeekDay(weekDay.toUpperCase());

  for (let index = 1; index <= numberOfWeeksUntilCurrentDate; index++) {
    const date = new Date();
    date.setDate(date.getDate());
    date.setDate(
      date.getDate() -
        numberDaysPerWeek * index -
        intervalOfDaysBetweenCurrentAndFriday
    );
    dates.push(date);
  }
  return dates;
};
