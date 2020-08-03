import React from "react";
import "./AddressInputForm.css";
import { Button } from "react-bootstrap";

const addressInputForm = (props) => {
  return (
    <form
      className="address-input-form"
      onSubmit={(e) => {
        props.handleAddressSubmit(e);
      }}
    >
      <label className="input-label">
        Ulica:
        <input
          className="input-field"
          name="streetName"
          type="text"
          defaultValue={props.address.streetName}
          onChange={(event) => props.onChangeInput(event)}
        ></input>
      </label>

      <label className="input-label">
        Grad:
        <input
          className="input-field"
          name="cityId"
          type="text"
          defaultValue={props.address.cityId}
          onChange={(event) => props.onChangeInput(event)}
        ></input>
      </label>

      <Button type="submit">Spremi</Button>
    </form>
  );
};

export default addressInputForm;
