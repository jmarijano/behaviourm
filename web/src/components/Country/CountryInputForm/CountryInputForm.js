import React from "react";
import "./CountryInputForm.css";
import { Button } from "react-bootstrap";

const countryInputForm = (props) => {
  return (
    <form
      className="country-input-form"
      onSubmit={(e) => {
        props.handleCountrySubmit(e);
      }}
    >
      <label className="input-label">
        Naziv države:
        <input
          className="input-field"
          name="name"
          type="text"
          defaultValue={props.country.name}
          onChange={(event) => props.onChangeInput(event)}
        ></input>
      </label>
      <Button type="submit">Spremi</Button>
    </form>
  );
};

export default countryInputForm;
