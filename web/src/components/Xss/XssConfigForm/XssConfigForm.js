import React from "react";
import "./XssConfigForm.css";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap-css-only";

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
          className={
            props.hasError("value") ? "form-control is-invalid" : "form-control"
          }
          name="value"
          type="text"
          defaultValue={props.xss.value}
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

xssConfigForm.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  handleXssSubmit: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default xssConfigForm;
