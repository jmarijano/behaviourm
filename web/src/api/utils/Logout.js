import React from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
  render() {
    return <Redirect to="/login"></Redirect>;
  }

  async componentDidMount() {
    await Cookies.remove("username");
  }
}

export default Logout;
