import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const navigation = () => {
  return (
    <div>
      <div className="row">
        <div className="col-md-12">
          <Router>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
              <Navbar.Brand href="/login">Behaviourm</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <NavDropdown title="Tablice" id="tablice-nav-dropdown">
                  <NavDropdown.Item href="/roleList">Role</NavDropdown.Item>
                  <NavDropdown.Item href="/countryList">
                    Države
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/cityList">Gradovi</NavDropdown.Item>
                  <NavDropdown.Item href="/addressList">
                    Adrese
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/departmentList">
                    Odjeli
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/userList">
                    Korisnici
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Unos" id="unos-nav-dropdown">
                  <NavDropdown.Item href="/roleInput">Role</NavDropdown.Item>
                  <NavDropdown.Item href="/countryInput">
                    Države
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/cityInput">Gradovi</NavDropdown.Item>
                  <NavDropdown.Item href="/addressInput">
                    Adrese
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/departmentInput">
                    Odjeli
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/userInput">
                    Korisnici
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar.Collapse>
            </Navbar>
            <br />
            <Switch>
              <Route exact path="/roleList"></Route>
              <Route exact path="/countryList"></Route>
              <Route exact path="/cityList"></Route>
              <Route exact path="/addressList"></Route>
              <Route exact path="/roleInput"></Route>
              <Route exact path="/countryInput"></Route>
              <Route exact path="/cityInput"></Route>
              <Route exact path="/addressInput"></Route>
              <Route exact path="/login"></Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
};

export default navigation;
