import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import RoleList from "./containers/RoleList/RoleList"
import CountryList from "./containers/CountryList/CountryList"
import CityList from './containers/CityList/CityList';
import AddressList from './containers/AddressList/AddressList';

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/countryList" component={CountryList}></Route>
          <Route path="/cityList" component={CityList}></Route>
          <Route path='/addressList' component={AddressList}></Route>
          <Route path="/" component={RoleList}></Route>
        </Switch>
      </Layout>
    </BrowserRouter >
  );
}

export default App;
