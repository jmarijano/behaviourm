import React, { Component } from "react";
import PasswordConfigForm from "../../../components/Password/PasswordConfigForm/PasswordConfigForm";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default class SqliConfig extends Component {
  state = {
    label: "Konfiguracija lozinka",
    value: "",
    redirect: false,
  };

  handlePasswordSubmit = (event) => {
    event.preventDefault();
    const { value } = this.state;
    const sqli = { value };
    AxiosInstance.post("/config/password", sqli, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.setState({ redirect: true });
      },
      (error) => {
        console.log({ error });
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
      return <Redirect to="/roleList"></Redirect>;
    }
    return (
      <React.Fragment>
        <h3>{this.state.label}</h3>
        <PasswordConfigForm
          handlePasswordSubmit={this.handlePasswordSubmit}
          password={{}}
          onChangeInput={this.onChangeInput}
        ></PasswordConfigForm>
      </React.Fragment>
    );
  }
}
