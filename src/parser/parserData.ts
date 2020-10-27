import { EndpointType } from "../types";
import { TableData } from "rivas-lib/lib/components/Table/table.types";

const matchEuroJackPot = [
  "5 Numbers + 2 Euronumbers",
  "5 Numbers + 1 Euronumber",
  "5 Numbers + 0 Euronumbers",
  "4 Numbers + 2 Euronumbers",
  "4 Numbers + 1 Euronumber",
  "4 Numbers + 0 Euronumbers",
  "3 Numbers + 2 Euronumbers",
  "2 Numbers + 2 Euronumbers",
  "3 Numbers + 1 Euronumber",
  "3 Numbers + 0 Euronumbers",
  "1 Number + 2 Euronumbers",
  "2 Numbers + 1 Euronumber",
];

const formatterCurrency = (currency) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  });

export const parser = (data: any, section: EndpointType): TableData => {
  if (section === "euroJackpot") {
    const resultEuroJackpot = data.last[0];
    const { currency } = resultEuroJackpot;
    const formatter = formatterCurrency(currency);
    const ranks = Object.keys(resultEuroJackpot.odds)
      .filter((oddKey) => resultEuroJackpot.odds[oddKey].prize > 0)
      .map((oddKey) => ({
        tier: oddKey,
        ...resultEuroJackpot.odds[oddKey],
      }))
      .sort((a, b) => {
        const comp =
          Number(a.tier.match(/(\d+)/g)[0]) <=
          Number(b.tier.match(/(\d+)/g)[0]);
        return comp ? -1 : 1;
      })
      .map((item, index) => ({
        tier: { displayValue: index + 1, value: index + 1 },
        match: {
          displayValue: matchEuroJackPot[index],
          value: matchEuroJackPot[index],
        },
        winners: { displayValue: `${item.winners}x`, value: item.winners },
        prize: {
          displayValue: formatter.format(item.prize),
          value: item.prize,
        },
      }));

    const columns = Object.keys(ranks[0]).map((key) => ({
      id: key,
      title: `${key[0].toUpperCase()}${key.slice(1)}`,
    }));

    return { columns, rows: ranks };
  }
};
