import React, { Component } from 'react'
import AxiosInstance from "../../../api/utils/AxiosInstance"
import AddressTable from "../../../components/Adress/AddressTable/AddressTable"

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

    deleteAddress = (id) => {
        AxiosInstance.delete("/addresses/" + id).then(
          (response) => {
            this.getAddressData();
          },
          (error) => {
            console.log(error);
          }
        );
      };

    render() {
        return (
            <React.Fragment>
                <AddressTable
                    addressList={this.state.addressList}
                    deleteAddress={this.deleteAddress}>
                </AddressTable>
            </React.Fragment>
        );
    }
}