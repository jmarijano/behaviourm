import React from "react";
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
