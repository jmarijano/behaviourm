import React from "react";
import Select from "react-select";
const combobox = (props) => {
  return (
    <Select
      options={props.options}
      onChange={(event) => props.onChangeInput(event)}
      name={props.name}
    />
  );
};

export default combobox;
