import React, { Component } from "react";
import AxiosInstance from "../../../api/utils/AxiosInstance";
import CityTable from "../../../components/City/CityTable/CityTable";
import CityInputForm from "../../../components/City/CityInputForm/CityInputForm";
import Cookies from "js-cookie";

export default class CityList extends Component {
  state = {
    cityList: [],
    id: "",
    name: "",
    countryId: "",
    update: false,
  };

  onChangeInput = (event) => {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value,
    });
  };

  handleCitySubmit = (event) => {
    event.preventDefault();
    let { id, name, countryId } = this.state;
    try {
      countryId = parseInt(countryId);
      const city = { name, countryId };
      AxiosInstance.put("/cities/" + id, city, {
        headers: {
          Authorization: "Bearer " + Cookies.get("username"),
        },
      }).then(
        (response) => {
          this.setState({
            update: false,
          });
          this.getCityData();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getCityData();
  }

  getCityData = () => {
    AxiosInstance.get("/cities", {
      headers: {
        Authorization: "Bearer " + Cookies.get("username"),
      },
    }).then(
      (response) => {
        console.log(response.data);
        this.setState({
          cityList: response.data.data,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  deleteCity = (id) => {
    AxiosInstance.delete("/cities/" + id, {
      headers: {
        Authorization: "Bearer" + Cookies.get("username"),
      },
    }).then(
      (response) => {
        this.getCityData();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  updateCity = (city) => {
    this.setState({
      update: true,
      name: city.name,
      id: city.id,
      countryId: city.countryId,
    });
  };

  render() {
    const { update, name, countryId } = this.state;
    if (update) {
      return (
        <React.Fragment>
          <h3>{this.state.label}</h3>
          <CityInputForm
            handleCitySubmit={this.handleCitySubmit}
            city={{ name, countryId }}
            onChangeInput={this.onChangeInput}
          ></CityInputForm>
        </React.Fragment>
      );
    }
    return (
      <React.Fragment>
        <CityTable
          cityList={this.state.cityList}
          deleteCity={this.deleteCity}
          updateCity={this.updateCity}
        ></CityTable>
      </React.Fragment>
    );
  }
}
