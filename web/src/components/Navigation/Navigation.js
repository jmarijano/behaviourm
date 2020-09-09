import React from "react";
import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cookies from "js-cookie";
import RoleList from "../../containers/Role/RoleList/RoleList";
import CountryList from "../../containers/Country/CountryList/CountryList";
import CityList from "../../containers/City/CityList/CityList";
import AddressList from "../../containers/Address/AddressList/AddressList";
import DepartmentList from "../../containers/Department/DepartmentList/DepartmentList";
import RoleInput from "../../containers/Role/RoleInput/RoleInput";
import SqliList from "../../containers/Sqli/SqliList/SqliList";
import XssList from "../../containers/Xss/XssList/XssList";
import UserList from "../../containers/User/UserList/UserList";
import CountryInput from "../../containers/Country/CountryInput/CountryInput";
import AddressInput from "../../containers/Address/AddressInput/AddressInput";
import CityInput from "../../containers/City/CityInput/CityInput";
import DepartmentInput from "../../containers/Department/DepartmentInput/DepartmentInput";
import UserInput from "../../containers/User/UserInput/UserInput";
import LoginInput from "../../containers/Login/LoginInput";
import ProtectedRoute from "../../api/utils/ProtectedRoute";
import Logout from "../../api/utils/Logout";
import SqliConfig from "../../containers/Sqli/SqliConfig/SqliConfig";
import XssConfig from "../../containers/Xss/XssConfig/XssConfig";
import PasswordConfig from "../../containers/Password/PasswordConfig/PasswordConfig";
import SqliComparisonDepartment from "../../containers/Comparison/Sqli/SqliComparisonDepartment";
import SqliComparisonRole from "../../containers/Comparison/Sqli/SqliComparisonRole";
import PasswordComparisonDepartment from "../../containers/Comparison/Password/PasswordComparisonDepartment";
import XssComparisonDepartment from "../../containers/Comparison/Xss/XssComparisonDepartment";
import XssComparisonRole from "../../containers/Comparison/Xss/XssComparisonRole";
import UserComparison from "../../containers/Comparison/User/UserComparison";
import Evaluation from "../../containers/Evaluation/Evaluation";
import { LinkContainer } from "react-router-bootstrap";
class navigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      props: props,
      user: Cookies.get("username"),
    };
    this.handler = this.handler.bind(this);
  }

  handler(e) {
    console.log({ e });
    this.setState({
      user: e,
    });
  }

  render() {
    const { user } = this.state;
    let logout;
    if (user !== undefined) {
      logout = (
        <LinkContainer to="/logout">
          <Nav.Link>Odjava</Nav.Link>
        </LinkContainer>
      );
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
                    <LinkContainer to="/roleList">
                      <NavDropdown.Item>Role</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/countryList">
                      <NavDropdown.Item href="/countryList">
                        Države
                      </NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/cityList">
                      <NavDropdown.Item>Gradovi</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/addressList">
                      <NavDropdown.Item>Adrese</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/departmentList">
                      <NavDropdown.Item>Odjeli</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/userList">
                      <NavDropdown.Item>Korisnici</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/sqliList">
                      <NavDropdown.Item>Sqli</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/xssList">
                      <NavDropdown.Item>Xss</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title="Unos" id="unos-nav-dropdown">
                    <LinkContainer to="/roleInput">
                      <NavDropdown.Item>Role</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/countryInput">
                      <NavDropdown.Item>Države</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/cityInput">
                      <NavDropdown.Item>Gradovi</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/addressInput">
                      <NavDropdown.Item>Adrese</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/departmentInput">
                      <NavDropdown.Item>Odjeli</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/userInput">
                      <NavDropdown.Item>Korisnici</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown title="Usporedba" id="usporedba-nav-dropdown">
                    <LinkContainer to="/sqliComparison/department">
                      <NavDropdown.Item>Sqli - odjeli</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/sqliComparison/role">
                      <NavDropdown.Item> Sqli - role</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/xssComparison/department">
                      <NavDropdown.Item> Xss - odjeli</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/xssComparison/role">
                      <NavDropdown.Item> Xss - role</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/passwordStrength/department">
                      <NavDropdown.Item>Lozinka - odjeli</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/passwordStrength/role">
                      <NavDropdown.Item>Lozinka - role</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/comparison/user">
                      <NavDropdown.Item>
                        Korisnika i njegovih prošlih akcija
                      </NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <NavDropdown
                    title="Konfiguracija"
                    id="konfiguracija-nav-dropdown"
                  >
                    <LinkContainer to="/config/sqli">
                      <NavDropdown.Item> Sqli</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/config/xss">
                      <NavDropdown.Item>Xss</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to="/config/password">
                      <NavDropdown.Item>Lozinka</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                  <LinkContainer to="/evaluation">
                    <Nav.Link>Evaluacija</Nav.Link>
                  </LinkContainer>
                  {logout}
                </Navbar.Collapse>
              </Navbar>
              <br />
              <Switch>
                <ProtectedRoute
                  path="/countryList"
                  component={CountryList}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/cityList"
                  component={CityList}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/addressList"
                  component={AddressList}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/roleList"
                  component={RoleList}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/departmentList"
                  component={DepartmentList}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/userList"
                  component={UserList}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/sqliList"
                  component={SqliList}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/xssList"
                  component={XssList}
                ></ProtectedRoute>

                <ProtectedRoute
                  path="/roleInput"
                  component={RoleInput}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/cityInput"
                  component={CityInput}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/addressInput"
                  component={AddressInput}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/countryInput"
                  component={CountryInput}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/departmentInput"
                  component={DepartmentInput}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/userInput"
                  component={UserInput}
                ></ProtectedRoute>

                <ProtectedRoute
                  path="/config/sqli"
                  component={SqliConfig}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/config/xss"
                  component={XssConfig}
                ></ProtectedRoute>

                <ProtectedRoute
                  path="/config/password"
                  component={PasswordConfig}
                ></ProtectedRoute>

                <Route
                  path="/login"
                  render={(props) => <LoginInput handler={this.handler} />}
                />
                <Route
                  path="/logout"
                  render={(props) => <Logout handler={this.handler} />}
                />

                <ProtectedRoute
                  path="/sqliComparison/department"
                  component={SqliComparisonDepartment}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/sqliComparison/role"
                  component={SqliComparisonRole}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/xssComparison/department"
                  component={XssComparisonDepartment}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/xssComparison/role"
                  component={XssComparisonRole}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/comparison/user"
                  component={UserComparison}
                ></ProtectedRoute>

                <ProtectedRoute
                  path="/passwordStrength/department"
                  component={PasswordComparisonDepartment}
                ></ProtectedRoute>
                <ProtectedRoute
                  path="/evaluation"
                  component={Evaluation}
                ></ProtectedRoute>
              </Switch>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

export default navigation;
