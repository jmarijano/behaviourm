import React, { Component } from 'react'
import AxiosInstance from "../../../api/utils/AxiosInstance"
import CityTable from "../../../components/City/CityTable/CityTable"

export default class CityList extends Component {

    state = {
        cityList: [],
    };


    componentDidMount() {
        this.getCityData();
    }

    getCityData = () => {
        AxiosInstance.get("/cities").then(response => {
            console.log(response.data);
            this.setState({
                cityList: response.data.data,
            })
        });
    };


    render() {
        return (
            <React.Fragment>
                <CityTable
                    cityList={this.state.cityList}>
                </CityTable>
            </React.Fragment>
        );
    }
}