import React, { Component } from 'react'

import AxiosInstance from "../../api/utils/AxiosInstance"

export default class RoleList extends Component {
    componentDidMount(){
        AxiosInstance.get("/roles").then(response => {
            let kae = response.data.data;
            for(let i=0;i<kae.length;i++){
                console.log(kae[i].name);
            }
            
            this.setState({
                studentList: response.data,
            });
        });
    }
    render(){
        return (<div></div>)
    }
}