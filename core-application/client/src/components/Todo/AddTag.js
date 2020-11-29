import React from "react";
// import { colourOptions } from "../data";
import Select from "react-select";

const AddTag = ({ setTodoData, defaultValue }) => {
  const options = [
    {
      value: "bug",
      label: "bug",
    },
    {
      value: "documentation",
      label: "documentation",
    },
    {
      value: "enhancement",
      label: "enhancement",
    },
    {
      value: "help",
      label: "help",
    },
    {
      value: "invalid",
      label: "invalid",
    },
    {
      value: "issue",
      label: "issue",
    },
    {
      value: "question",
      label: "question",
    },
    {
      value: "help",
      label: "help",
    },
    {
      value: "wontfix",
      label: "wontfix",
    },
  ];

  const handleChange = (currentTags) => {
    setTodoData((prev) => ({
      ...prev,
      tags: currentTags ? currentTags.map((tag) => tag.value) : [],
    }));
  };
  return (
    <div>
      <Select
        closeMenuOnSelect={false}
        isMulti
        defaultValue={defaultValue}
        options={options}
        onChange={handleChange}
      />
    </div>
  );
};

export default AddTag;
