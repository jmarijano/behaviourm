import React from "react";
import "./SqliConfigForm.css";
import { Button } from "react-bootstrap";

const sqliConfigForm = (props) => {
  return (
    <form
      className="sqli-config-form"
      onSubmit={(e) => {
        props.handleSqliSubmit(e);
      }}
    >
      <label className="input-label">
        Vrijednost:
        <input
          className="input-field"
          name="value"
          type="text"
          defaultValue={props.sqli.value}
          onChange={(event) => props.onChangeInput(event)}
        ></input>
      </label>

      <Button type="submit">Spremi</Button>
    </form>
  );
};

export default sqliConfigForm;
