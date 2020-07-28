import React from 'react'
import {
    Navbar,
    Nav,
    NavDropdown,
} from "react-bootstrap";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const navigation = () => {
    return (
        <div>
            <div className="row">
                <div className="col-md-12">
                    <Router>
                        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
                            <Navbar.Brand href="#home">React Bootstrap Navbar</Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <NavDropdown title="CRUD" id="basic-nav-dropdown">
                                    <NavDropdown.Item href="/">Role</NavDropdown.Item>
                                    <NavDropdown.Item href="/countryList">Države</NavDropdown.Item>
                                    <NavDropdown.Item href="/cityList">Gradovi</NavDropdown.Item>
                                    <NavDropdown.Item href='/addressList'>Adrese</NavDropdown.Item>
                                </NavDropdown>
                            </Navbar.Collapse>
                        </Navbar>
                        <br />
                        <Switch>
                            <Route exact path="/">
                            </Route>
                            <Route exact path="/countryList">
                            </Route>
                            <Route exact path="/cityList">
                            </Route>
                            <Route exact path='/addressList'></Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        </div>
    )
}

export default navigation
