import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import DepartmentTable from "../../../components/Department/DepartmentTable/DepartmentTable";
import DepartmentInputForm from "../../../components/Department/DepartmentInputForm/DepartmentInputForm";
import Cookies from "js-cookie";
import Spinner from "../../../components/UI/Spinner";

export default class DepartmentList extends Component {
  state = {
    departmentList: [],
    id: "",
    update: false,
    name: "",
    loading: true,
  };

  componentDidMount() {
    this.getDepartmentData();
  }

  handleDepartmentSubmit = (event) => {
    event.preventDefault();
    const { id, name } = this.state;
    const department = { name };
    AxiosInstance.put("/departments/" + id, department, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.setState({ update: false });
        this.getDepartmentData();
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  getDepartmentData = () => {
    AxiosInstance.get("/departments", {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.setState({
          departmentList: response.data.data,
          loading: false,
        });
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  deleteDepartment = (id) => {
    AxiosInstance.delete("/departments/" + id, {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.getDepartmentData();
      },
      (error) => {
        console.log({ error });
      }
    );
  };

  updateDepartment = (department) => {
    this.setState({
      update: true,
      id: department.id,
      name: department.name,
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
    const { update, name, departmentList } = this.state;
    let table;
    if (departmentList.length > 0) {
      table = (
        <DepartmentTable
          departmentList={this.state.departmentList}
          deleteDepartment={this.deleteDepartment}
          updateDepartment={this.updateDepartment}
        ></DepartmentTable>
      );
    }
    if (update) {
      return (
        <React.Fragment>
          <h3>{this.state.label}</h3>
          <DepartmentInputForm
            handleDepartmentSubmit={this.handleDepartmentSubmit}
            department={{ name }}
            onChangeInput={this.onChangeInput}
          ></DepartmentInputForm>
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
