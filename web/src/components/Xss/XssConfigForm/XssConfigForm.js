import React from "react";
import "./XssConfigForm.css";
import { Button } from "react-bootstrap";

const xssConfigForm = (props) => {
  return (
    <form
      className="xss-config-form"
      onSubmit={(e) => {
        props.handleXssSubmit(e);
      }}
    >
      <label className="input-label">
        Vrijednost:
        <input
          className="input-field"
          name="value"
          type="text"
          defaultValue={props.xss.value}
          onChange={(event) => props.onChangeInput(event)}
        ></input>
      </label>

      <Button type="submit">Spremi</Button>
    </form>
  );
};

export default xssConfigForm;
