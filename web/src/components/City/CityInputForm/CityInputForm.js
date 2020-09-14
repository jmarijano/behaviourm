import React from "react";
import "./CityInputForm.css";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import "bootstrap-css-only";

const cityInputForm = (props) => {
  return (
    <form
      className="city-input-form"
      onSubmit={(e) => {
        props.handleCitySubmit(e);
      }}
    >
      <label className="input-label">
        Ime grada:
        <input
          className={
            props.hasError("name") ? "form-control is-invalid" : "form-control"
          }
          name="name"
          type="text"
          defaultValue={props.city.name}
          onChange={(event) => props.onChangeInput(event)}
          onFocus={(event) => props.onFocus(event)}
        ></input>
        <div className={props.hasError("name") ? "inline-errormsg" : "hidden"}>
          Unesite vrijednost!
        </div>
      </label>

      <label className="input-label">
        Država:
        <input
          className={
            props.hasError("countryId")
              ? "form-control is-invalid"
              : "form-control"
          }
          name="countryId"
          type="text"
          defaultValue={props.city.countryId}
          onChange={(event) => props.onChangeInput(event)}
          onFocus={(event) => props.onFocus(event)}
        ></input>
        <div
          className={props.hasError("countryId") ? "inline-errormsg" : "hidden"}
        >
          Unesite vrijednost!
        </div>
      </label>
      <Button type="submit">Spremi</Button>
    </form>
  );
};

cityInputForm.propTypes = {
  onChangeInput: PropTypes.func.isRequired,
  handleCitySubmit: PropTypes.func.isRequired,
  hasError: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
};

export default cityInputForm;
