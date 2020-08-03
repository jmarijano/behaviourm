import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import AddressTable from "../../../components/Adress/AddressTable/AddressTable";
import AddressInputForm from "../../../components/Adress/AddressInputForm/AddressInputForm";

export default class AddressList extends Component {
  state = {
    addressList: [],
    id: "",
    update: false,
    cityId: "",
    streetName: "",
  };

  componentDidMount() {
    this.getAddressData();
  }

  handleAddressSubmit = (event) => {
    event.preventDefault();
    let { id, streetName, cityId } = this.state;
    try {
      cityId = parseInt(cityId);
      const address = { id, streetName, cityId };
      console.log(streetName + " " + cityId);
      AxiosInstance.put("/addresses/" + address.id, address).then(
        (response) => {
          this.setState({ update: false });
          this.getAddressData();
        },
        (error) => {
          console.log(error);
        }
      );
      console.log(address);
    } catch (error) {
      console.log(error);
    }
  };

  getAddressData = () => {
    AxiosInstance.get("/addresses").then((response) => {
      console.log(response.data);
      this.setState({
        addressList: response.data.data,
      });
    });
  };

  deleteAddress = (id) => {
    AxiosInstance.delete("/addresses/" + id).then(
      (response) => {
        this.getAddressData();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  updateAddress = (address) => {
    this.setState({
      update: true,
      streetName: address.streetName,
      cityId: address.cityId,
      id: address.id,
    });
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
    const { update, cityId, streetName } = this.state;
    if (!update) {
      return (
        <React.Fragment>
          <AddressTable
            addressList={this.state.addressList}
            deleteAddress={this.deleteAddress}
            updateAddress={this.updateAddress}
          ></AddressTable>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <h3>{this.state.label}</h3>
        <AddressInputForm
          handleAddressSubmit={this.handleAddressSubmit}
          address={{ streetName, cityId }}
          onChangeInput={this.onChangeInput}
        ></AddressInputForm>
      </React.Fragment>
    );
  }
}
