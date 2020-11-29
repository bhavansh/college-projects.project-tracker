import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
const animatedComponents = makeAnimated();

const AddMembers = ({ setTodoData, members, defaultValue }) => {
  const getMembers = members?.map((member) => ({
    value: member.memberId._id,
    label: member.memberId.name,
  }));

  const handleChange = (value) => {
    setTodoData((prev) => ({
      ...prev,
      assignedMembers: value
        ? value.map((member) => ({
            memberId: member.value,
          }))
        : [],
    }));
  };
  return (
    <div>
      <Select
        closeMenuOnSelect={false}
        components={animatedComponents}
        defaultValue={defaultValue}
        isMulti
        options={getMembers}
        onChange={handleChange}
      />
    </div>
  );
};

export default AddMembers;
