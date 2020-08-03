import React, { Component } from "react";
import AddressInputForm from "../../../components/Adress/AddressInputForm/AddressInputForm";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";

export default class AddressInput extends Component {
  state = {
    label: "Unos adrese",
    streetName: "",
    cityId: "",
    redirect: false,
  };

  handleAddressSubmit = (event) => {
    event.preventDefault();
    let { streetName, cityId } = this.state;
    try {
      cityId = parseInt(cityId);
      const address = { streetName, cityId };
      console.log(address.streetName + " " + address.cityId);
      AxiosInstance.post("/addresses", address).then(
        (response) => {
          this.setState({
            redirect: true,
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
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
        ></AddressInputForm>
      </React.Fragment>
    );
  }
}
