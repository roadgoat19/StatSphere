import React from "react";
import Select from "react-select";

const PlayerSearchDropdown = ({ options, onSelect, placeholder }) => {
  const formattedOptions = options.map((option) => ({ value: option, label: option }));

  const customStyles = {
    control: (provided) => ({
      ...provided,
      width: "250px", // Set a fixed width for the dropdown
    }),
    input: (provided) => ({
      ...provided,
      width: "100%", // Ensure input takes up full width without resizing
    }),
    menu: (provided) => ({
      ...provided,
      width: "250px", // Ensures dropdown menu matches the input width
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "black",
    }),
    option: (provided, state) => ({
      ...provided,
      color: "black",
      backgroundColor: state.isSelected ? "#ddd" : "white",
    }),
  };

  return (
    <Select
      options={formattedOptions}
      onChange={(selectedOption) => onSelect(selectedOption.value)}
      placeholder={placeholder}
      styles={customStyles} // Apply fixed width styles
    />
  );
};

export default PlayerSearchDropdown;
