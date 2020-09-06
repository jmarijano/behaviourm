import React, { Component } from "react";
import CityInputForm from "../../../components/City/CityInputForm/CityInputForm";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default class AddressInput extends Component {
  state = {
    label: "Unos grada",
    name: "",
    countryId: "",
    redirect: false,
  };

  handleCitySubmit = (event) => {
    event.preventDefault();
    let { name, countryId } = this.state;
    try {
      countryId = parseInt(countryId);
      const city = { name, countryId };
      AxiosInstance.post("/cities", city, {
        headers: {
          Authorization: "Bearer " + Cookies.get("username"),
        },
      }).then(
        (response) => {
          this.setState({
            redirect: true,
          });
        },
        (error) => {
          console.log({ error });
        }
      );
    } catch (error) {
      console.log({ error });
    }
  };

  onChangeInput = (event) => {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/cityList"></Redirect>;
    }
    return (
      <React.Fragment>
        <h3>{this.state.label}</h3>
        <CityInputForm
          handleCitySubmit={this.handleCitySubmit}
          city={{}}
          onChangeInput={this.onChangeInput}
        ></CityInputForm>
      </React.Fragment>
    );
  }
}
