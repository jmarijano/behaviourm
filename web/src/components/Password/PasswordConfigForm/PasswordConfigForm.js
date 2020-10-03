import React from "react";
import "./PasswordConfigForm.css";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap-css-only";

const passwordConfigForm = (props) => {
  return (
    <form
      className="password-config-form"
      onSubmit={(e) => {
        props.handlePasswordSubmit(e);
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
          defaultValue={props.password.value}
          onChange={(event) => props.onChangeInput(event)}
        ></input>
        <div className={props.hasError("value") ? "inline-errormsg" : "hidden"}>
          Unesite vrijednost!
        </div>
      </label>

      <Button type="submit">Spremi</Button>
    </form>
  );
};

passwordConfigForm.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  handlePasswordSubmit: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
};

export default passwordConfigForm;
