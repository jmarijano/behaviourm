import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import UserTable from "../../../components/User/UserTable/UserTable";
import UserInputForm from "../../../components/User/UserInputForm/UserInputForm";
import Cookies from "js-cookie";
import Spinner from "../../../components/UI/Spinner";

export default class UserList extends Component {
  state = {
    userList: [],
    name: "",
    update: false,
    id: "",
    loading: true,
  };

  componentDidMount() {
    this.getUserData();
  }

  handleUserSubmit = (event) => {
    event.preventDefault();
    const { id, name } = this.state;
    const role = { name };
    AxiosInstance.put("/users/" + id, role, {
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

  getUserData = () => {
    AxiosInstance.get("/users", {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        const wow = response.data.data;
        console.log({ wow });
        this.setState({
          userList: response.data.data,
          loading: false,
        });
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  deleteUser = (id) => {
    AxiosInstance.delete("/users/" + id, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.getUserData();
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  updateUser = (user) => {
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
            handleUserSubmit={this.handleUserSubmit}
            user={{ name }}
            onChangeInput={this.onChangeInput}
          ></UserInputForm>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Spinner loading={this.state.loading}></Spinner>
        <UserTable
          userList={this.state.userList}
          deleteUser={this.deleteUser}
          updateRole={this.updateUser}
        ></UserTable>
      </React.Fragment>
    );
  }
}
