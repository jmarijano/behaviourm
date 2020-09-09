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
                    <NavDropdown.Item href="/cityList">
                      Gradovi
                    </NavDropdown.Item>
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
                    <NavDropdown.Item href="/cityInput">
                      Gradovi
                    </NavDropdown.Item>
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
                    <NavDropdown.Item href="/config/sqli">
                      {" "}
                      Sqli
                    </NavDropdown.Item>
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
