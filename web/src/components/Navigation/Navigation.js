import React from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
const navigation = (props) => {
  const user = props.user;
  let logout;
  if (user !== undefined) {
    logout = <Nav.Link href="/logout">Odjava</Nav.Link>;
  }
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
                  <NavDropdown.Item href="/sqliList">Sqli</NavDropdown.Item>
                  <NavDropdown.Item href="/xssList">Xss</NavDropdown.Item>
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
                <NavDropdown title="Usporedba" id="usporedba-nav-dropdown">
                  <NavDropdown.Item href="/sqliComparison/department">
                    {" "}
                    Sqli - odjeli
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/sqliComparison/role">
                    {" "}
                    Sqli - role
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/xssComparison/department">
                    {" "}
                    Xss - odjeli
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/xssComparison/role">
                    {" "}
                    Xss - role
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/passwordStrength/department">
                    Lozinka - odjeli
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/passwordStrength/role">
                    Lozinka - role
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/comparison/user">
                    Korisnika i njegovih prošlih akcija
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Konfiguracija"
                  id="konfiguracija-nav-dropdown"
                >
                  <NavDropdown.Item href="/config/sqli"> Sqli</NavDropdown.Item>
                  <NavDropdown.Item href="/config/xss">Xss</NavDropdown.Item>
                  <NavDropdown.Item href="/config/password">
                    Lozinka
                  </NavDropdown.Item>
                </NavDropdown>

                <Nav.Link href="/evaluation">Evaluacija</Nav.Link>
                {logout}
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
              <Route exact path="/xssList"></Route>
              <Route exact path="/logout"></Route>
              <Route exact path="/sqliComparison/department">
                {" "}
              </Route>
              <Route exact path="/sqliComparison/role"></Route>
              <Route exact path="/xssComparison/department"></Route>
              <Route exact path="/xssComparison/role"></Route>
            </Switch>
          </Router>
        </div>
      </div>
    </div>
  );
};

export default navigation;
