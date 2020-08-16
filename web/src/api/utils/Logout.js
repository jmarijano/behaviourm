import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

class Logout extends React.Component {
  render() {
    Cookies.remove("username");
    return <Redirect to={{ pathname: "/login" }} />;
  }
}

export default Logout;
