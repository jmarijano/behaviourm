import React, { Component } from "react";
import RoleInputForm from "../../../components/Role//RoleInputForm/RoleInputForm";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default class RoleInput extends Component {
  state = {
    label: "Unos role",
    name: "",
    redirect: false,
  };

  handleRoleSubmit = (event) => {
    event.preventDefault();
    const { name } = this.state;
    const role = { name };
    AxiosInstance.post("/roles", role, {
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
        <RoleInputForm
          handleRoleSubmit={this.handleRoleSubmit}
          role={{}}
          onChangeInput={this.onChangeInput}
        ></RoleInputForm>
      </React.Fragment>
    );
  }
}
