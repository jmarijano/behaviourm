import React, { Component } from "react";
import AddressInputForm from "../../../components/Adress/AddressInputForm/AddressInputForm";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default class AddressInput extends Component {
  state = {
    label: "Unos adrese",
    streetName: "",
    cityId: "",
    redirect: false,
    errors: [],
  };

  hasError = (key) => {
    return this.state.errors.indexOf(key) !== -1;
  };

  onFocus = (event) => {
    event.preventDefault();
    var array = [...this.state.errors];
    var index = array.indexOf(event.target.name);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ errors: array });
    }
  };

  handleAddressSubmit = (event) => {
    event.preventDefault();
    let { streetName, cityId } = this.state;
    let errors = [];
    if (streetName === "") errors.push("streetName");
    if (cityId === "") errors.push("cityId");
    this.setState({
      errors: errors,
    });
    if (errors.length === 0)
      try {
        cityId = parseInt(cityId);
        const address = { streetName, cityId };
        AxiosInstance.post("/addresses", address, {
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
      return <Redirect to="/addressList"></Redirect>;
    }
    return (
      <React.Fragment>
        <h3>{this.state.label}</h3>
        <AddressInputForm
          handleAddressSubmit={this.handleAddressSubmit}
          address={{}}
          onChangeInput={this.onChangeInput}
          onFocus={this.onFocus}
          hasError={this.hasError}
        ></AddressInputForm>
      </React.Fragment>
    );
  }
}
