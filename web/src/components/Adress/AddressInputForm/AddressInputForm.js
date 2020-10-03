import React from "react";
import "./AddressInputForm.css";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap-css-only";

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
          className={
            props.hasError("streetName")
              ? "form-control is-invalid"
              : "form-control"
          }
          name="streetName"
          type="text"
          defaultValue={props.address.streetName}
          onChange={(event) => props.onChangeInput(event)}
          onFocus={(event) => props.onFocus(event)}
        ></input>
        <div
          className={
            props.hasError("streetName") ? "inline-errormsg" : "hidden"
          }
        >
          Unesite vrijednost!
        </div>
      </label>

      <label className="input-label">
        Grad:
        <input
          className={
            props.hasError("cityId")
              ? "form-control is-invalid"
              : "form-control"
          }
          name="cityId"
          type="text"
          defaultValue={props.address.cityId}
          onChange={(event) => props.onChangeInput(event)}
          onFocus={(event) => props.onFocus(event)}
        ></input>
        <div
          className={props.hasError("cityId") ? "inline-errormsg" : "hidden"}
        >
          Unesite vrijednost!
        </div>
      </label>

      <Button type="submit">Spremi</Button>
    </form>
  );
};

addressInputForm.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  handleAddressSubmit: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
};

export default addressInputForm;
