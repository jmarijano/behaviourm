import React, { Component } from 'react'
import AxiosInstance from "../../../api/utils/AxiosInstance"
import CountryTable from "../../../components/Country/CountryTable/CountryTable"

export default class CountryList extends Component {

    state = {
        countryList: [],
    };


    componentDidMount() {
        this.getCountryData();
    }

    getCountryData = () => {
        AxiosInstance.get("/countries").then(response => {
            console.log(response.data);
            this.setState({
                countryList: response.data.data,
            })
        });
    };


    render() {
        return (
            <React.Fragment>
                <CountryTable
                    countryList={this.state.countryList}>
                </CountryTable>
            </React.Fragment>
        );
    }
}