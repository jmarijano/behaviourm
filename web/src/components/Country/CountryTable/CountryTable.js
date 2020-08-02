import React from "react";
import { Table, Button } from "react-bootstrap";
import "./CountryTable.css";

const countryTable = (props) => {
  const countryList = props.countryList.map((country, i) => (
    <tr key={country.id}>
      <td>{i + 1}</td>
      <td>{country.name}</td>
      <td>
        <Button className="table-button-promijeni">Promijeni</Button>
      </td>
      <td>
        <Button
          className="table-button-ponisti"
          onClick={(event) => {
            event.preventDefault();
            props.deleteCountry(country.id);
          }}
        >
          Obriši
        </Button>
      </td>
    </tr>
  ));
  return (
    <React.Fragment>
      <Table bordered hover className="data-table">
        <thead>
          <tr>
            <th>Redni broj</th>
            <th>Naziv države</th>
            <th>Promijeni</th>
            <th>Poništi</th>
          </tr>
        </thead>
        <tbody>{countryList}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default countryTable;
