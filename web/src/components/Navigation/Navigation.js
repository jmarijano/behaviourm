import React from 'react'
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const navigation = () => {
    return (
        <Navbar>
            <strong className="estudent">eStudent</strong>
            <Nav >
                <NavLink  to="/" exact>
                    Unos novog studenta
            </NavLink>
                <NavLink  to="/studentList" >
                    Popis studenata
            </NavLink>
            </Nav>
        </Navbar>
    )
}

export default navigation
