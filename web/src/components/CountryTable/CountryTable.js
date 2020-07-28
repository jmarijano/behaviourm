import React from 'react';
import { Table, Button } from 'react-bootstrap';
import "./CountryTable.css";

const countryTable = (props) => {
    const countryList = props.countryList.map((country, i) => (
        <tr key={country.id}>
            <td>{i + 1}</td>
            <td>{country.name}</td>
        </tr>
    ));
    return (
        <React.Fragment>
            <Table bordered hover className="data-table">
                <thead>
                    <tr>
                        <th>Redni broj</th>
                        <th>Naziv države</th>
                    </tr>
                </thead>
                <tbody>
                    {countryList}
                </tbody>
            </Table>
        </React.Fragment>
    );
};

export default countryTable;