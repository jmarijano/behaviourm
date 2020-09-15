import React from "react";
import "./SqliConfigForm.css";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap-css-only";

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
          className={
            props.hasError("value") ? "form-control is-invalid" : "form-control"
          }
          name="value"
          type="text"
          defaultValue={props.sqli.value}
          onChange={(event) => props.onChangeInput(event)}
          onFocus={(event) => props.onFocus(event)}
        ></input>
        <div className={props.hasError("value") ? "inline-errormsg" : "hidden"}>
          Unesite vrijednost!
        </div>
      </label>

      <Button type="submit">Spremi</Button>
    </form>
  );
};

sqliConfigForm.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  handleSqliSubmit: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
};

export default sqliConfigForm;
