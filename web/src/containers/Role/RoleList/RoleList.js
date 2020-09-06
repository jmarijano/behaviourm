import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import RoleTable from "../../../components/Role/RoleTable/RoleTable";
import RoleInputForm from "../../../components/Role/RoleInputForm/RoleInputForm";
import Cookies from "js-cookie";
import Spinner from "../../../components/UI/Spinner";

export default class RoleList extends Component {
  state = {
    roleList: [],
    name: "",
    update: false,
    id: "",
    loading: true,
  };

  componentDidMount() {
    this.getRoleData();
  }

  handleRoleSubmit = (event) => {
    event.preventDefault();
    const { id, name } = this.state;
    const role = { name };
    AxiosInstance.put("/roles/" + id, role, {
      headers: {
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

  getRoleData = () => {
    AxiosInstance.get("/roles", {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.setState({
          roleList: response.data.data,
          loading: false,
        });
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  deleteRole = (id) => {
    AxiosInstance.delete("/roles/" + id, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.getRoleData();
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  updateRole = (role) => {
    this.setState({
      update: true,
      id: role.id,
      name: role.name,
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
    const { update, name, roleList } = this.state;
    let table;
    if (roleList.length > 0) {
      table = (
        <RoleTable
          roleList={this.state.roleList}
          deleteRole={this.deleteRole}
          updateRole={this.updateRole}
        ></RoleTable>
      );
    }
    if (update) {
      return (
        <React.Fragment>
          <h3>{this.state.label}</h3>
          <RoleInputForm
            handleRoleSubmit={this.handleRoleSubmit}
            role={{ name }}
            onChangeInput={this.onChangeInput}
          ></RoleInputForm>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <Spinner loading={this.state.loading}></Spinner>
        {table}
      </React.Fragment>
    );
  }
}
