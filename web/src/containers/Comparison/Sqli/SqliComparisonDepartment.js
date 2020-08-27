import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Combobox from "../../../components/UI/Combobox";
import Graph from "../../../components/UI/Graph";

export default class SqliComparisonDepartment extends Component {
  state = {
    options: [],
    labelUser: "SQLi usporedba korisnika i odjela u kojem se nalazi",
    name: "",
    redirect: false,
    userId: "",
    data: [],
    generalData: [],
    label: "SQLi usporedba odjela",
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
    this.getAverageDepartment();
  }

  onChangeInput = (event) => {
    let value = event.value;
    this.setState(
      {
        userId: value,
      },
      () => {
        this.getDepartmentData();
        this.getAverageUserSqliData();
      }
    );
  };

  getAverageDepartment = () => {
    AxiosInstance.get("/uba/sqli/department", {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        console.log(response.data.data);
        this.setState({
          generalData: response.data.data,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getDepartmentData = () => {
    const { userId } = this.state;
    const request = { userId };
    AxiosInstance.post("/uba/sqli/department/user", request, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.setState({
          data: response.data.data,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getAverageUserSqliData = () => {
    const { userId } = this.state;
    const request = { userId };
    AxiosInstance.post("/uba/sqli/user/average", request, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.setState((prevState) => ({
          data: [...prevState.data, response.data.data[0]],
        }));
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    const { redirect, data } = this.state;
    let graph;
    if (redirect) {
      return <Redirect to="/countryList"></Redirect>;
    }
    if (data.length > 0) {
      graph = <Graph data={this.state.data}></Graph>;
    }
    return (
      <React.Fragment>
        <h3>{this.state.label}</h3>
        <br></br>
        <Graph data={this.state.generalData}></Graph>
        <br></br>
        <h3>{this.state.labelUser}</h3>
        <br></br>
        <Combobox
          onChangeInput={this.onChangeInput}
          options={this.state.options}
          name="userId"
        ></Combobox>
        <br></br>
        {graph}
      </React.Fragment>
    );
  }
}
