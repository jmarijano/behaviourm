import React from "react";
import "./LoginInputForm.css";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

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
          className="input-field"
          name="username"
          type="text"
          defaultValue={props.user.username}
          onChange={(event) => props.onChangeInput(event)}
        ></input>
      </label>

      <label className="input-label">
        Lozinka:
        <input
          className="input-field"
          name="password"
          type="password"
          defaultValue={props.user.password}
          onChange={(event) => props.onChangeInput(event)}
        ></input>
      </label>

      <Button type="submit">Prijava</Button>
    </form>
  );
};

loginInputForm.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  handleLoginSubmit: PropTypes.func.isRequired,
};

export default loginInputForm;
