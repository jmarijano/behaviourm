import React, { Component } from "react";
import LoginInputForm from "../../components/Login/LoginInputForm";
import AxiosInstance from "../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import ModalComponent from "../../components/UI/Modal/Modal";

export default class LoginInput extends Component {
  constructor(props) {
    super(props);
    console.log({ props });
    this.state = {
      username: "",
      password: "",
      redirect: false,
      cookie: Cookies.get("username"),
      error: "",
      show: false,
    };
  }

  handleLoginSubmit = (event) => {
    event.preventDefault();
    const { username, password } = this.state;
    const user = { username, password };
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
        <h3>{this.state.label}</h3>
        <LoginInputForm
          onChangeInput={this.onChangeInput}
          handleLoginSubmit={this.handleLoginSubmit}
          user={{}}
        ></LoginInputForm>
        <ModalComponent
          {...this.state}
          handleClose={this.handleClose}
        ></ModalComponent>
      </React.Fragment>
    );
  }
}
