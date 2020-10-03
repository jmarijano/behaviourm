import React from "react";
import Navigation from "../../components/Navigation/Navigation.js";
import { Container } from "react-bootstrap";
import Cookies from "js-cookie";
class Layout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      props: props,
      user: Cookies.get("username"),
    };
  }
  componentDidMount() {
    const kae = Cookies.get("username");
    console.log({ kae });
  }
  render() {
    const { user, props } = this.state;
    return (
      <React.Fragment>
        <Navigation user={user}></Navigation>
        <Container className="content">{props.children}</Container>
      </React.Fragment>
    );
  }
}

export default Layout;
