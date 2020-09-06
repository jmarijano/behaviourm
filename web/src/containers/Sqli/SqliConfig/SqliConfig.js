import React, { Component } from "react";
import SqliConfigForm from "../../../components/Sqli/SqliConfigForm/SqliConfigForm";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default class SqliConfig extends Component {
  state = {
    label: "Konfiguracija Sqli",
    value: "",
    redirect: false,
  };

  handleSqliSubmit = (event) => {
    event.preventDefault();
    const { value } = this.state;
    const sqli = { value };
    AxiosInstance.post("/config/sqli", sqli, {
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
        <SqliConfigForm
          handleSqliSubmit={this.handleSqliSubmit}
          sqli={{}}
          onChangeInput={this.onChangeInput}
        ></SqliConfigForm>
      </React.Fragment>
    );
  }
}
