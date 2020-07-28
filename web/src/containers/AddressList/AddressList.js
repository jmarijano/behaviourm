import React, { Component } from 'react'
import AxiosInstance from "../../api/utils/AxiosInstance"
import AddressTable from "../../components/AddressTable/AddressTable"

export default class AddressList extends Component {

    state = {
        addressList: [],
    };


    componentDidMount() {
        this.getAddressData();
    }

    getAddressData = () => {
        AxiosInstance.get("/addresses").then(response => {
            console.log(response.data);
            this.setState({
                addressList: response.data.data,
            })
        });
    };


    render() {
        return (
            <React.Fragment>
                <AddressTable
                    addressList={this.state.addressList}>
                </AddressTable>
            </React.Fragment>
        );
    }
}