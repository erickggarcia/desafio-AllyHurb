import React from "react"
import Select from "react-select";

const customStyles = {
  container: (provided, state) => ({
    ...provided,
    width: "330px",
    fontSize: "16px"
  }),
  menuList: (provided, state) => ({
    ...provided,
    fontSize: "16px"
  }),
}

const CustomSelect = ({ options, onChange, value }) => {
  return (
    <Select
      styles={customStyles}
      options={options}
      onChange={onChange}
      getOptionLabel={(option) => option.value}
      getOptionValue={(option) => option.value}
      value={value}
      placeholder="Escolha uma ou mais opções"
      noOptionsMessage={() => "Nenhuma ocorrencia foi encontrada :("}
      isMulti
    />
  );
};

export default CustomSelect;
