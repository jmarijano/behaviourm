import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout></Layout>
    </BrowserRouter>
  );
}

export default App;
