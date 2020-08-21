import React from "react";
import { Redirect } from "react-router-dom";
import Cookies from "js-cookie";

class Logout extends React.Component {
  render() {
    Cookies.remove("username");
    this.refreshPage();
    return <div></div>;
  }

  refreshPage = () => {
    this.props.history.push("/login");
  };
}

export default Logout;
