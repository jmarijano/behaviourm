import React from "react";
import "./PasswordConfigForm.css";
import { Button } from "react-bootstrap";

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
          className="input-field"
          name="value"
          type="text"
          defaultValue={props.password.value}
          onChange={(event) => props.onChangeInput(event)}
        ></input>
      </label>

      <Button type="submit">Spremi</Button>
    </form>
  );
};

export default passwordConfigForm;
