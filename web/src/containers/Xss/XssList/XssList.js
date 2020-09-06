import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import XssTable from "../../../components/Xss/XssTable/XssTable";
import UserInputForm from "../../../components/User/UserInputForm/UserInputForm";
import Cookies from "js-cookie";
import Spinner from "../../../components/UI/Spinner";

export default class XssList extends Component {
  state = {
    xssList: [],
    name: "",
    update: false,
    id: "",
    loading: true,
  };

  componentDidMount() {
    this.getXssData();
  }

  handleXssSubmit = (event) => {
    event.preventDefault();
    const { id, name } = this.state;
    const role = { name };
    AxiosInstance.put("/xsses/" + id, role, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.setState({ update: false });
        this.getRoleData();
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  getXssData = () => {
    AxiosInstance.get("/xsses", {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.setState({
          xssList: response.data.data,
          loading: false,
        });
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  deleteXss = (id) => {
    AxiosInstance.delete("/xsses/" + id, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.getXssData();
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  updateXss = (user) => {
    this.setState({
      update: true,
      id: user.id,
      name: user.name,
    });
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
    const { update, name } = this.state;
    if (update) {
      return (
        <React.Fragment>
          <h3>{this.state.label}</h3>
          <UserInputForm
            handleXssSubmit={this.handleXssSubmit}
            user={{ name }}
            onChangeInput={this.onChangeInput}
          ></UserInputForm>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Spinner loading={this.state.loading}></Spinner>
        <XssTable
          xssList={this.state.xssList}
          deleteXss={this.deleteXss}
          updateXss={this.updateXss}
        ></XssTable>
      </React.Fragment>
    );
  }
}
