import React, { Component } from "react";
import AxiosInstance from "../../api/utils/AxiosInstance";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";
import Combobox from "../../components/UI/Combobox";
import Graph from "../../components/UI/Graph";

export default class Evaluation extends Component {
  state = {
    data: [],
  };

  componentDidMount() {
    this.getEvaluationData();
  }

  getEvaluationData = () => {
    AxiosInstance.get("/uba/evaluation", {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        console.log(response.data.data);
        this.setState({
          data: response.data.data,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  createData = (data) => {
    return (
      <div>
        {data.map((object, i) => (
          <div className='evaluation-div'>
            <p>Ime i prezime korisnika: {object.name}</p>
            <p>SQLi vrijednost: {object.sqli}</p>
            <p>XSS vrijednost: {object.xss}</p>
            <p>Lozinka vrijednost: {object.password}</p>
            <br></br>
          </div>
        ))}
      </div>
    );
  };

  render() {
    const { data } = this.state;
    let div = this.createData(data);
    return <React.Fragment>{div}</React.Fragment>;
  }
}
