import React from "react";
import { useState } from "react";
import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import moment from "moment";

export default function Calender({ setProjectInfo, initialDay }) {
  const [date, setDate] = useState(initialDay);

  const setData = (day) => {
    setDate(day);
    setProjectInfo((prev) => ({
      ...prev,
      deadline: day,
    }));
  };
  return (
    <div>
      <DayPickerInput
        onDayChange={setData}
        classNames="mb-5 focus:outline-none p-2"
        placeholder="DD-MM-YYYY"
        value={date === "" ? "" : moment(date).format("DD-MM-YYYY")}
      />
    </div>
  );
}
