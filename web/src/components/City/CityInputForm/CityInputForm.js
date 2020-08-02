import React from "react";
import "./CityInputForm.css";
import { Button } from "react-bootstrap";

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
          className="input-field"
          name="name"
          type="text"
          defaultValue={props.city.name}
          onChange={(event) => props.onChangeInput(event)}
        ></input>
      </label>

      <label className="input-label">
        Država:
        <input
          className="input-field"
          name="countryId"
          type="text"
          defaultValue={props.city.countryId}
          onChange={(event) => props.onChangeInput(event)}
        ></input>
      </label>
      <Button type="submit">Spremi</Button>
    </form>
  );
};

export default cityInputForm;
