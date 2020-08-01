import React, { Component } from 'react'
import AxiosInstance from "../../../api/utils/AxiosInstance"
import RoleTable from "../../../components/Role/RoleTable/RoleTable"

export default class RoleList extends Component {

    state = {
        roleList: [],
    };


    componentDidMount() {
        this.getRoleData();
    }

    getRoleData = () => {
        AxiosInstance.get("/roles").then(response => {
            console.log(response.data);
            this.setState({
                roleList: response.data.data,
            })
        });
    };


    render() {
        return (
            <React.Fragment>
                <RoleTable
                    roleList={this.state.roleList}>
                </RoleTable>
            </React.Fragment>
        );
    }
}