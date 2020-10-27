import * as React from "react";
import { Dropdown, Option } from "rivas-lib/lib";
import { formatDate, getWeekDaysDates } from "../../utils/date.utils";
import { get } from "../../services/api";

const param = {
  numberOfWeeksUntilCurrentDate: 10,
  weekDay: "FRIDAY" as const,
};

const Table = React.lazy(() => import("rivas-lib/lib/components/Table"));

const Main = () => {
  const { useEffect, useState, Suspense } = React;
  const [value, setValue] = useState(null);
  const [content, setContent] = useState(null);

  const dates = getWeekDaysDates(param).map(
    (date: Date): Option => formatDate(date)
  );

  const onChangeValue = (valueParam: string) => setValue(valueParam);

  useEffect(() => {
    const getResult = async () => {
      const result = value
        ? await get({ query: value, section: "euroJackpot" })
        : null;
      setContent(result);
    };
    getResult();
  }, [value]);
  return (
    <div>
      <Dropdown
        forLabel="date"
        titleLabel="Dates: "
        options={dates}
        onChangeCb={onChangeValue}
      />
      {content && (
        <div>
          <Suspense fallback={<div>Loading data...</div>}>
            <Table {...content} />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default Main;
