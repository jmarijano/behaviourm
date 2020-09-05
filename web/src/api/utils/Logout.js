import React from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
  render() {
    return <Redirect to="/login"></Redirect>;
  }

  async componentDidMount() {
    console.log("Logout: "+ Cookies.get("username"))
    await Cookies.remove("username");
    console.log("Logout: "+ Cookies.get("username"))
  }
}

export default Logout;
