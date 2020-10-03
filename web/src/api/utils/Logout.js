import React from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router-dom";

class Logout extends React.Component {
  constructor(props) {
    super(props);
    console.log({ props });
    this.state = {
      user: props.state,
    };
  }
  render() {
    return <Redirect to="/login"></Redirect>;
  }

  async componentDidMount() {
    this.props.handler(undefined);
    await Cookies.remove("username");
  }
}

export default Logout;
