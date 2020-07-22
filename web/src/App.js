import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import RoleList from "./containers/RoleList/RoleList"

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/studentList" component={RoleList}></Route>
          <Route path="/" component={RoleList}></Route>
        </Switch>
      </Layout>
    </BrowserRouter >
  );
}

export default App;
