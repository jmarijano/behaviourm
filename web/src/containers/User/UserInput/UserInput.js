import React, { Component } from "react";
import UserInputForm from "../../../components/User/UserInputForm/UserInputForm";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";

export default class UserInput extends Component {
  state = {
    label: "Unos role",
    name: "",
    redirect: false,
  };

  handleUserSubmit = (event) => {
    event.preventDefault();
    const { name } = this.state;
    const role = { name };
    AxiosInstance.post("/users", role, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
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
      return <Redirect to="/userList"></Redirect>;
    }
    return (
      <React.Fragment>
        <h3>{this.state.label}</h3>
        <UserInputForm
          handleUserSubmit={this.handleUserSubmit}
          user={{}}
          onChangeInput={this.onChangeInput}
        ></UserInputForm>
      </React.Fragment>
    );
  }
}
