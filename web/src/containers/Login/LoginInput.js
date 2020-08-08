import React, { Component } from "react";
import LoginInputForm from "../../components/Login/LoginInputForm";
import AxiosInstance from "../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

export default class LoginInput extends Component {
  state = {
    username: "",
    password: "",
    redirect: false,
    cookie: Cookies.get("username"),
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const user = { username, password };
    AxiosInstance.post("/login", user).then(
      (response) => {
        console.log(response.data);
        Cookies.set("username", response.data.accessToken);
        this.setState({
          redirect: true,
        });
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
      return <Redirect to="/addressList"></Redirect>;
    }
    return (
      <React.Fragment>
        <h3>{this.state.label}</h3>
        <LoginInputForm
          onChangeInput={this.onChangeInput}
          handleLoginSubmit={this.handleLoginSubmit}
          user={{}}
        ></LoginInputForm>
      </React.Fragment>
    );
  }
}
