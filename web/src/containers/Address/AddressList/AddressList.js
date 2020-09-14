import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import AddressTable from "../../../components/Adress/AddressTable/AddressTable";
import AddressInputForm from "../../../components/Adress/AddressInputForm/AddressInputForm";
import Cookies from "js-cookie";
import Spinner from "../../../components/UI/Spinner";
import ModalComponent from "../../../components/UI/Modal/Modal";

export default class AddressList extends Component {
  state = {
    addressList: [],
    id: "",
    update: false,
    cityId: "",
    streetName: "",
    options: [],
    loading: true,
    content: "",
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
      AxiosInstance.put("/addresses/" + address.id, address, {
        headers: {
          Authorization: "Bearer " + Cookies.get("username"),
        },
      }).then(
        (response) => {
          this.setState({ update: false, loading: false });
          this.getAddressData();
        },
        (error) => {
          console.log({ error });
        }
      );
    } catch (error) {
      console.log({ error });
    }
  };

  getAddressData = () => {
    AxiosInstance.get("/addresses", {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        const kae = response.data.data;
        console.log({ kae });
        this.setState({
          addressList: response.data.data,
          loading: false,
        });
      },
      (error) => {
        this.setState(
          {
            content: error.message,
          },
          () => {}
        );
      }
    );
  };

  loginModalRef = ({ handleShow }) => {
    this.showModal = handleShow;
  };

  onLoginClick = () => {
    this.showModal();
  };

  deleteAddress = (id) => {
    AxiosInstance.delete("/addresses/" + id, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.getAddressData();
      },
      (error) => {
        console.log({ error });
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
    const { update, cityId, streetName, addressList, content } = this.state;
    let table;
    if (addressList.length > 0) {
      table = (
        <AddressTable
          addressList={this.state.addressList}
          deleteAddress={this.deleteAddress}
          updateAddress={this.updateAddress}
        ></AddressTable>
      );
    }

    if (!update) {
      return (
        <React.Fragment>
          <Spinner loading={this.state.loading}></Spinner>
          {table}

          <ModalComponent
            ref={this.loginModalRef}
            content={this.state.content}
          ></ModalComponent>
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
