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
          className={[
            props.hasError("username")
              ? "form-control is-invalid"
              : "form-control",
            ,
            props.proba ? "form-control is-valid" : "",
          ].join(" ")}
          name="username"
          type="text"
          defaultValue={props.user.username}
          onChange={(event) => props.onChangeInput(event)}
          onFocus={(event) => props.onFocus(event)}
          onBlur={(event) => props.onBlur(event)}
        ></input>
        <div
          className={props.hasError("username") ? "inline-errormsg" : "hidden"}
        >
          Unesite vrijednost!
        </div>
      </label>

      <label className="input-label">
        Lozinka:
        <div className="wow">
          <input
            className={
              props.hasError("password")
                ? "form-control is-invalid"
                : "form-control"
            }
            name="password"
            type={props.showPassword ? "text" : "password"}
            defaultValue={props.user.password}
            onChange={(event) => props.onChangeInput(event)}
            onFocus={(event) => props.onFocus(event)}
            onBlur={(event) => props.onBlur(event)}
          ></input>
          <Button className="Ijao" onClick={props.handleShowPassword}>
            Prikaži/sakrij
          </Button>
        </div>
      </label>
      <div
        className={props.hasError("password") ? "inline-errormsg" : "hidden"}
      >
        Unesite vrijednost!
      </div>

      <Button type="submit">Prijava</Button>
    </form>
  );
};

loginInputForm.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  handleLoginSubmit: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
};

export default loginInputForm;
