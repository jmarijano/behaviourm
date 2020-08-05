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
import UserList from "./containers/User/UserList/UserList";
import CountryInput from "./containers/Country/CountryInput/CountryInput";
import AddressInput from "./containers/Address/AddressInput/AddressInput";
import CityInput from "./containers/City/CityInput/CityInput";
import DepartmentInput from "./containers/Department/DepartmentInput/DepartmentInput";
import UserInput from "./containers/User/UserInput/UserInput";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/countryList" component={CountryList}></Route>
          <Route path="/cityList" component={CityList}></Route>
          <Route path="/addressList" component={AddressList}></Route>
          <Route path="/roleList" component={RoleList}></Route>
          <Route path="/departmentList" component={DepartmentList}></Route>
          <Route path="/userList" component={UserList}></Route>

          <Route path="/roleInput" component={RoleInput}></Route>
          <Route path="/cityInput" component={CityInput}></Route>
          <Route path="/addressInput" component={AddressInput}></Route>
          <Route path="/countryInput" component={CountryInput}></Route>
          <Route path="/departmentInput" component={DepartmentInput}></Route>
          <Route path="/userInput" component={UserInput}></Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
