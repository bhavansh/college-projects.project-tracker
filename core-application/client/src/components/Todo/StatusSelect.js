import React from "react";
import { useState } from "react";
import Select from "react-select";

const StatusSelect = ({ defalutStatus, setTodoData }) => {
  const options = [
    { value: 0, label: "To Do" },
    { value: 1, label: "In Progress" },
    { value: 2, label: "Completed" },
  ];
  const [selectedOption, setSelectedOption] = useState(
    options.find((option) => option.value === defalutStatus)
  );
  const handleChange = (value) => {
    setSelectedOption(value);
    setTodoData((prev) => ({
      ...prev,
      status: value && value.value,
    }));
  };

  return (
    <Select
      value={selectedOption}
      onChange={handleChange}
      options={options}
      defaultValue={options.find((option) => option.value === defalutStatus)}
    />
  );
};

export default StatusSelect;
