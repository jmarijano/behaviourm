import React, { Component } from "react";
import LoginInputForm from "../../components/Login/LoginInputForm";
import AxiosInstance from "../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import ModalComponent from "../../components/UI/Modal/Modal";
import { connect } from "react-redux";

class LoginInput extends Component {
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
      proba: false,
      showPassword: false,
    };
  }
  hasError = (key) => {
    return this.state.errors.indexOf(key) !== -1;
  };

  handleShowPassword = () => {
    let { showPassword } = this.state;
    showPassword = showPassword ? false : true;
    this.setState({
      showPassword: showPassword,
    });
  };

  setPRoba = (proba) => {
    this.setState({
      proba: proba,
    });
  };

  handleValidation = () => {
    const { username, password } = this.state;
    let errors = [];
    if (username === "") {
      errors.push("username");
      this.setPRoba(false);
    } else {
      this.setPRoba(true);
    }
    if (password === "") {
      this.setPRoba(false);
      errors.push("password");
    } else {
      this.setPRoba(true);
    }
    this.setState({
      errors: errors,
    });
  };
  handleLoginSubmit = (event) => {
    const { username, password } = this.state;
    const user = { username, password };
    const { errors } = this.state;
    event.preventDefault();
    this.handleValidation();
    if (errors.length === 0 && username !== "" && password !== "") {
      AxiosInstance.post("/login", user)
        .then((response) => {
          console.log({ response });
          this.props.storeToken;
          Cookies.set("username", response.data.accessToken);
          this.props.handler(response.data.accessToken);
          this.setState({
            redirect: true,
          });
        })
        .catch((error) => {
          let errorData = "";
          if (error.response) {
            errorData = error.response.data.error;
          } else if (error.request) {
            errorData = "Neočekivana iznimka";
          } else {
            errorData = "Neočekivana iznimka";
          }
          this.setState({
            show: true,
            error: errorData,
          });
        });
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
    this.setState(
      {
        [name]: value,
      },
      () => {
        this.handleValidation();
      }
    );
  };

  onBlur = (event) => {
    event.preventDefault();
    this.handleValidation();
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
          onBlur={this.onBlur}
          handleShowPassword={this.handleShowPassword}
          {...this.state}
        ></LoginInputForm>
        <ModalComponent
          {...this.state}
          handleClose={this.handleClose}
        ></ModalComponent>
        {this.props.token}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch,wow) => {
  return {
    storeToken: () => dispatch({ type: "STORE_TOKEN",payload: }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginInput);
