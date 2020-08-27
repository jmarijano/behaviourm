import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import Cookies from "js-cookie";
import Combobox from "../../../components/UI/Combobox";
import Graph from "../../../components/UI/Graph";

export default class PasswordComparisonDepartment extends Component {
  state = {
    options: [],
    departmentId: "",
    data: [],
    label: "Usporedba jačine lozinke unutar određenog odjela",
  };
  getDepartmentData = () => {
    AxiosInstance.get("/departments", {
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
            label: element.name,
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
    this.getDepartmentData();
  }

  getPasswordStrength = () => {
    const { departmentId } = this.state;
    const request = { departmentId };
    AxiosInstance.post("/uba/passwordStrenght/department", request, {
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

  onChangeInput = (event) => {
    console.log(event);
    let value = event.value;
    this.setState(
      {
        departmentId: value,
      },
      () => {
        this.getPasswordStrength();
      }
    );
  };

  render() {
    const { data, label,departmentId } = this.state;
    let graph;
    if (data.length > 0) {
      graph = <Graph data={data}></Graph>;
    }
    if(data.length === 0 && departmentId.length !== 0){
      graph = (<h3>Ne postoje zapisi!</h3>)
    }
    return (
      <React.Fragment>
        <h3>{label}</h3>
        <br></br>
        <Combobox
          onChangeInput={this.onChangeInput}
          options={this.state.options}
          name="departmentId"
        ></Combobox>
        <br></br>
        {graph}
      </React.Fragment>
    );
  }
}
