import React, { Component } from "react";
import CountryInputForm from "../../../components/Country/CountryInputForm/CountryInputForm";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default class CountryInput extends Component {
  state = {
    label: "Unos države",
    name: "",
    redirect: false,
  };

  handleCountrySubmit = (event) => {
    event.preventDefault();
    const { name } = this.state;
    const country = { name };
    AxiosInstance.post("/countries", country, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        console.log(response.data);

        this.setState({ redirect: true });
      },
      (error) => {
        console.log(error);
      }
    );
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
      return <Redirect to="/countryList"></Redirect>;
    }
    return (
      <React.Fragment>
        <h3>{this.state.label}</h3>
        <CountryInputForm
          handleCountrySubmit={this.handleCountrySubmit}
          country={{}}
          onChangeInput={this.onChangeInput}
        ></CountryInputForm>
      </React.Fragment>
    );
  }
}
