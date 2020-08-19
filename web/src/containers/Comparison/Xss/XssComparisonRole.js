import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Combobox from "../../../components/UI/Combobox";

export default class XssComparisonRole extends Component {
  state = {
    options: [],
    label: "Xss usporedba role",
    name: "",
    redirect: false,
    userId: "",
  };

  getUserData = () => {
    AxiosInstance.get("/users", {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        let options = [];
        for (let index = 0; index < response.data.data.length; index++) {
          const element = response.data.data[index];
          options.push({
            value: element.id,
            label: element.name + " " + element.surname,
          });
        }
        console.log(options);
        this.setState({
          options: options,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  componentDidMount() {
    this.getUserData();
  }

  onChangeInput = (event) => {
    console.log(event);
    let value = event.value;
    this.setState({
      userId: value,
    });
  };

  render() {
    const { redirect } = this.state;
    console.log(this.state.userId);
    if (redirect) {
      return <Redirect to="/countryList"></Redirect>;
    }
    return (
      <React.Fragment>
        <h3>{this.state.label}</h3>
        <Combobox
          onChangeInput={this.onChangeInput}
          options={this.state.options}
        ></Combobox>
      </React.Fragment>
    );
  }
}
