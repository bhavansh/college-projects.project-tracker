import React from "react";
import ReactDom from "react-dom";
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

const MyTimePicker = ({ date, setDate, setProjectInfo }) => {
  const format = "h:mm a";

  function onChange(value) {
    setDate((prev) => (prev + value === null ? value : value.format(format)));
    setProjectInfo((prev) => ({
      ...prev,
      deadline: prev + value === null ? value : value.format(format),
    }));
  }

  return (
    <div>
      <TimePicker
        showSecond={false}
        // defaultValue={new Date()}
        className="xxx"
        onChange={onChange}
        format={format}
        use12Hours
        inputReadOnly
      />
    </div>
  );
};

export default MyTimePicker;
