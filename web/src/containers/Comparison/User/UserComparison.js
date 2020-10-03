import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Combobox from "../../../components/UI/Combobox";
import Graph from "../../../components/UI/Graph";

export default class UserComparison extends Component {
  state = {
    options: [],
    labelSqli:
      "Usporedba zadnje korisničke aktivnosti i njegovih prijašnjih aktivnosti (SQLI)",
    name: "",
    redirect: false,
    userId: "",
    dataSqli: [],
    dataXss: [],
    labelXss:
      "Usporedba zadnje korisničke aktivnosti i njegovih prijašnjih aktivnosti (XSS)",
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
        console.log({ error });
      }
    );
  };

  componentDidMount() {
    this.getUserData();
  }

  getSqli = () => {
    const { userId } = this.state;
    const request = { userId };
    AxiosInstance.post("/uba/sqli/user", request, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.setState({
          dataSqli: response.data.data,
        });
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  getXss = () => {
    const { userId } = this.state;
    const request = { userId };
    AxiosInstance.post("/uba/xss/user", request, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.setState({
          dataXss: response.data.data,
        });
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  onChangeInput = (event) => {
    let value = event.value;
    this.setState(
      {
        userId: value,
      },
      () => {
        this.getSqli();
        this.getXss();
      }
    );
  };

  render() {
    const { redirect, dataSqli: data } = this.state;
    let graph;
    if (redirect) {
      return <Redirect to="/countryList"></Redirect>;
    }
    if (data.length > 0) {
      graph = <Graph data={this.state.dataSqli}></Graph>;
    }
    return (
      <React.Fragment>
        <h3>Odaberite korisnika</h3>
        <br></br>
        <Combobox
          onChangeInput={this.onChangeInput}
          options={this.state.options}
        ></Combobox>
        <br></br>
        <h3>{this.state.labelXss}</h3>
        <br></br>
        <Graph data={this.state.dataXss}></Graph>
        <br></br>
        <h3>{this.state.labelSqli}</h3>
        <br></br>

        {graph}
      </React.Fragment>
    );
  }
}
