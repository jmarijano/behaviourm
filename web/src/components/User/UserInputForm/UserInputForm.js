import React from "react";
import "./UserInputForm.css";
import { Button } from "react-bootstrap";

const userInputForm = (props) => {
  return (
    <form
      className="user-input-form"
      onSubmit={(e) => {
        props.handleUserSubmit(e);
      }}
    >
      <label className="input-label">
        Ime:
        <input
          className="input-field"
          name="name"
          type="text"
          defaultValue={props.user.name}
          onChange={(event) => props.onChangeInput(event)}
        ></input>
      </label>

      <Button type="submit">Spremi</Button>
    </form>
  );
};

export default userInputForm;
