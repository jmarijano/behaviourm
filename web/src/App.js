import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import RoleList from "./containers/Role/RoleList/RoleList";
import CountryList from "./containers/Country/CountryList/CountryList";
import CityList from "./containers/City/CityList/CityList";
import AddressList from "./containers/Address/AddressList/AddressList";
import DepartmentList from "./containers/Department/DepartmentList/DepartmentList";
import RoleInput from "./containers/Role/RoleInput/RoleInput";
import SqliList from "./containers/Sqli/SqliList/SqliList";
import XssList from "./containers/Xss/XssList/XssList";
import UserList from "./containers/User/UserList/UserList";
import CountryInput from "./containers/Country/CountryInput/CountryInput";
import AddressInput from "./containers/Address/AddressInput/AddressInput";
import CityInput from "./containers/City/CityInput/CityInput";
import DepartmentInput from "./containers/Department/DepartmentInput/DepartmentInput";
import UserInput from "./containers/User/UserInput/UserInput";
import LoginInput from "./containers/Login/LoginInput";
import ProtectedRoute from "./api/utils/ProtectedRoute";
import Logout from "./api/utils/Logout";
import SqliConfig from "./containers/Sqli/SqliConfig/SqliConfig";
import XssConfig from "./containers/Xss/XssConfig/XssConfig";
import SqliComparisonDepartment from "./containers/Comparison/Sqli/SqliComparisonDepartment";
import SqliComparisonRole from "./containers/Comparison/Sqli/SqliComparisonRole";

import XssComparisonDepartment from "./containers/Comparison/Xss/XssComparisonDepartment";
import XssComparisonRole from "./containers/Comparison/Xss/XssComparisonRole";

import Cookies from "js-cookie";

function App() {
  const username = Cookies.get("username");
  return (
    <BrowserRouter>
      <Layout cookie={username}>
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
          <ProtectedRoute path="/xssList" component={XssList}></ProtectedRoute>

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

          <Route path="/login" component={LoginInput}></Route>
          <Route path="/logout" component={Logout}></Route>

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
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
