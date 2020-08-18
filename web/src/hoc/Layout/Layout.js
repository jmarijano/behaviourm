import React from "react";
import Navigation from "../../components/Navigation/Navigation.js";
import { Container } from "react-bootstrap";

const Layout = (props) => {
  console.log(props);
  return (
    <React.Fragment>
      <Navigation></Navigation>
      <Container className="content">{props.children}</Container>
    </React.Fragment>
  );
};

export default Layout;
