import React, { Component } from "react";
import LoginInputForm from "../../components/Login/LoginInputForm";
import AxiosInstance from "../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import ModalComponent from "../../components/UI/Modal/Modal";

export default class LoginInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      redirect: false,
      cookie: Cookies.get("username"),
      error: "",
      show: false,
      errors: [],
    };
  }
  hasError = (key) => {
    return this.state.errors.indexOf(key) !== -1;
  };

  handleLoginSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const user = { username, password };
    let errors = [];
    if (username === "") errors.push("username");
    if (password === "") errors.push("password");
    this.setState({
      errors: errors,
    });
    if (errors.length === 0) {
      AxiosInstance.post("/login", user).then(
        (response) => {
          Cookies.set("username", response.data.accessToken);
          this.props.handler(response.data.accessToken);
          this.setState({
            redirect: true,
          });
        },
        (error) => {
          this.setState(
            {
              show: true,
              error: error.response.data.error,
            },
            () => {}
          );
        }
      );
    }
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

  onChangeInput = (event) => {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleShow = () => {
    this.setState({
      show: true,
    });
  };
  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/addressList"></Redirect>;
    }
    return (
      <React.Fragment>
        <LoginInputForm
          onChangeInput={this.onChangeInput}
          handleLoginSubmit={this.handleLoginSubmit}
          user={{}}
          hasError={this.hasError}
          onFocus={this.onFocus}
        ></LoginInputForm>
        <ModalComponent
          {...this.state}
          handleClose={this.handleClose}
        ></ModalComponent>
      </React.Fragment>
    );
  }
}
