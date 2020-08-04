import React, { Component } from "react";
import DepartmentInputForm from "../../../components/Department/DepartmentInputForm/DepartmentInputForm";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";

export default class DepartmentInput extends Component {
  state = {
    label: "Unos odjela",
    name: "",
    redirect: false,
  };

  handleDepartmentSubmit = (event) => {
    event.preventDefault();
    const { name } = this.state;
    const department = { name };
    AxiosInstance.post("/departments", department).then(
      (response) => {
        console.log(response.data);

        this.setState({ redirect: true });
      },
      (error) => {
        console.log(error);
      }
    );
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
    const {redirect} = this.state;
    if(redirect){
      return <Redirect to='/departmentList'></Redirect>
    }
    return (
      <React.Fragment>
        <h3>{this.state.label}</h3>
        <DepartmentInputForm
          handleDepartmentSubmit={this.handleDepartmentSubmit}
          department={{}}
          onChangeInput={this.onChangeInput}
        ></DepartmentInputForm>
      </React.Fragment>
    );
  }
}
