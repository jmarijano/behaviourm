import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import SqliTable from "../../../components/Sqli/SqliTable/SqliTable";
import UserInputForm from "../../../components/User/UserInputForm/UserInputForm";
import Cookies from "js-cookie";
import Spinner from "../../../components/UI/Spinner";

export default class SqliList extends Component {
  state = {
    sqliList: [],
    name: "",
    update: false,
    id: "",
    loading: true,
  };

  componentDidMount() {
    this.getSqliData();
  }

  handleSqliSubmit = (event) => {
    event.preventDefault();
    const { id, name } = this.state;
    const role = { name };
    AxiosInstance.put("/sqlis/" + id, role, {
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

  getSqliData = () => {
    AxiosInstance.get("/sqlis", {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.setState({
          sqliList: response.data.data,
          loading: false,
        });
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  deleteSqli = (id) => {
    AxiosInstance.delete("/sqlis/" + id, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.getSqliData();
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  updateSqli = (user) => {
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
            handleUserSubmit={this.handleSqliSubmit}
            user={{ name }}
            onChangeInput={this.onChangeInput}
          ></UserInputForm>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Spinner loading={this.state.loading}></Spinner>
        <SqliTable
          sqliList={this.state.sqliList}
          deleteSqli={this.deleteSqli}
          updateSqli={this.updateSqli}
        ></SqliTable>
      </React.Fragment>
    );
  }
}
