import React from "react";

const AddIcon = ({ handleAddInputField }) => {
  return (
    <div
      className="flex items-center justify-center rounded-full h-7 w-7 cursor-pointer bg-primary-100"
      onClick={handleAddInputField}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    </div>
  );
};

export default AddIcon;
