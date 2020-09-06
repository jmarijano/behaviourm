import React, { Component } from "react";
import XssConfigForm from "../../../components/Xss/XssConfigForm/XssConfigForm";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default class SqliConfig extends Component {
  state = {
    label: "Konfiguracija Xss",
    value: "",
    redirect: false,
  };

  handleXssSubmit = (event) => {
    event.preventDefault();
    const { value } = this.state;
    const xss = { value };
    AxiosInstance.post("/config/xss", xss, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        console.log({ error });
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
        <XssConfigForm
          handleXssSubmit={this.handleXssSubmit}
          xss={{}}
          onChangeInput={this.onChangeInput}
        ></XssConfigForm>
      </React.Fragment>
    );
  }
}
