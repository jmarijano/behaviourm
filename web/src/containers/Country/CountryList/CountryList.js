import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import CountryTable from "../../../components/Country/CountryTable/CountryTable";
import CountryInputForm from "../../../components/Country/CountryInputForm/CountryInputForm";
export default class CountryList extends Component {
  state = {
    countryList: [],
    id: "",
    update: false,
    name: "",
  };

  componentDidMount() {
    this.getCountryData();
  }

  handleCountrySubmit = (event) => {
    event.preventDefault();
    const { id, name } = this.state;
    const country = { name };
    AxiosInstance.put("/countries/" + id, country).then(
      (response) => {
        console.log(response.data);
        this.setState({ update: false });
        this.getCountryData();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  getCountryData = () => {
    AxiosInstance.get("/countries").then(
      (response) => {
        console.log(response.data);
        this.setState({
          countryList: response.data.data,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  deleteCountry = (id) => {
    AxiosInstance.delete("/countries/" + id).then(
      (response) => {
        this.getCountryData();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  updateCountry = (country) => {
    this.setState({
      update: true,
      id: country.id,
      name: country.name,
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
          <CountryInputForm
            handleCountrySubmit={this.handleCountrySubmit}
            country={{ name }}
            onChangeInput={this.onChangeInput}
          ></CountryInputForm>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <CountryTable
          countryList={this.state.countryList}
          deleteCountry={this.deleteCountry}
          updateCountry={this.updateCountry}
        ></CountryTable>
      </React.Fragment>
    );
  }
}
