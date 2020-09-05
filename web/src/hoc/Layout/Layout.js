import React from "react";
import Navigation from "../../components/Navigation/Navigation.js";
import { Container } from "react-bootstrap";
import Cookies from "js-cookie";
const Layout = (props) => {
  console.log(props);
  const user = Cookies.get("username");
  console.log("Layout: " + user);
  return (
    <React.Fragment>
      <Navigation user={user}></Navigation>
      <Container className="content">{props.children}</Container>
    </React.Fragment>
  );
};

export default Layout;
