import React from "react";
import "./DepartmentInputForm.css";
import { Button } from "react-bootstrap";

const departmentInputForm = (props) => {
  return (
    <form
      className="department-input-form"
      onSubmit={(e) => {
        props.handleDepartmentSubmit(e);
      }}
    >
      <label className="input-label">
        Naziv odjela:
        <input
          className="input-field"
          name="name"
          type="text"
          defaultValue={props.department.name}
          onChange={(event) => props.onChangeInput(event)}
        ></input>
      </label>
      <Button type="submit">Spremi</Button>
    </form>
  );
};

export default departmentInputForm;
