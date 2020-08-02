import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import RoleTable from "../../../components/Role/RoleTable/RoleTable";

export default class RoleList extends Component {
  state = {
    roleList: [],
  };

  componentDidMount() {
    this.getRoleData();
  }

  getRoleData = () => {
    AxiosInstance.get("/roles").then((response) => {
      console.log(response.data);
      this.setState({
        roleList: response.data.data,
      });
    });
  };

  deleteRole = (id) => {
    AxiosInstance.delete("/roles/" + id).then(
      (response) => {
        this.getRoleData();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    return (
      <React.Fragment>
        <RoleTable
          roleList={this.state.roleList}
          deleteRole={this.deleteRole}
        ></RoleTable>
      </React.Fragment>
    );
  }
}
