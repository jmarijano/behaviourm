import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import DepartmentTable from "../../../components/Department/DepartmentTable/DepartmentTable";
import DepartmentInputForm from "../../../components/Department/DepartmentInputForm/DepartmentInputForm";

export default class DepartmentList extends Component {
  state = {
    departmentList: [],
    id: "",
    update: false,
    name: "",
  };

  componentDidMount() {
    this.getDepartmentData();
  }

  handleDepartmentSubmit = (event) => {
    event.preventDefault();
    const { id, name } = this.state;
    const department = { name };
    AxiosInstance.put("/departments/" + id, department).then(
      (response) => {
        console.log(response.data);
        this.setState({ update: false });
        this.getDepartmentData();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getDepartmentData = () => {
    AxiosInstance.get("/departments").then((response) => {
      console.log(response.data);
      this.setState({
        departmentList: response.data.data,
      });
    });
  };

  deleteDepartment = (id) => {
    AxiosInstance.delete("/departments/" + id).then(
      (response) => {
        this.getDepartmentData();
      },
      (error) => {
        console.log(error);
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
    const { update, name } = this.state;
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
        <DepartmentTable
          departmentList={this.state.departmentList}
          deleteDepartment={this.deleteDepartment}
          updateDepartment={this.updateDepartment}
        ></DepartmentTable>
      </React.Fragment>
    );
  }
}
