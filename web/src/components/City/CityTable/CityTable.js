import React from "react";
import { Table, Button } from "react-bootstrap";
import "./CityTable.css";

const cityTable = (props) => {
  const cityList = props.cityList.map((city, i) => (
    <tr key={city.id}>
      <td>{city.id}</td>
      <td>{city.name}</td>
      <td>
        <Button
          variant="warning"
          onClick={(event) => {
            event.preventDefault();
            props.updateCity(city);
          }}
        >
          Promijeni
        </Button>
      </td>
      <td>
        <Button
          variant="danger"
          onClick={(event) => {
            event.preventDefault();
            props.deleteCity(city.id);
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
            <th>Naziv grada</th>
            <th>Promijeni</th>
            <th>Poništi</th>
          </tr>
        </thead>
        <tbody>{cityList}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default cityTable;
