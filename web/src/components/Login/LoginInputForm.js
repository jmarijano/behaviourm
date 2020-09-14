import React from "react";
import "./LoginInputForm.css";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap-css-only";

const loginInputForm = (props) => {
  return (
    <form
      className="login-input-form"
      onSubmit={(e) => {
        props.handleLoginSubmit(e);
      }}
    >
      <label className="input-label">
        Korisničko ime:
        <input
          className={
            props.hasError("username")
              ? "form-control is-invalid"
              : "form-control"
          }
          name="username"
          type="text"
          defaultValue={props.user.username}
          onChange={(event) => props.onChangeInput(event)}
          onFocus={(event) => props.onFocus(event)}
        ></input>
        <div
          className={props.hasError("username") ? "inline-errormsg" : "hidden"}
        >
          Unesite vrijednost!
        </div>
      </label>

      <label className="input-label">
        Lozinka:
        <input
          className={
            props.hasError("password")
              ? "form-control is-invalid"
              : "form-control"
          }
          name="password"
          type="password"
          defaultValue={props.user.password}
          onChange={(event) => props.onChangeInput(event)}
          onFocus={(event) => props.onFocus(event)}
        ></input>
        <div
          className={props.hasError("password") ? "inline-errormsg" : "hidden"}
        >
          Unesite vrijednost!
        </div>
      </label>

      <Button type="submit">Prijava</Button>
    </form>
  );
};

loginInputForm.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  handleLoginSubmit: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default loginInputForm;
