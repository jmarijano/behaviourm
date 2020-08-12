import React from "react";
import { Table, Button } from "react-bootstrap";
import "./SqliTable.css";

const sqliTable = (props) => {
  const sqliList = props.sqliList.map((sqli, i) => (
    <tr key={sqli.id}>
      <td>{i + 1}</td>
      <td>{sqli.userId}</td>
      <td>{sqli.value}</td>
      <td>{sqli.createdOn}</td>
      <td>{sqli.updatedOn}</td>
      <td>
        <Button
          className="table-button-promijeni"
          onClick={(event) => {
            event.preventDefault();
            props.updateSqli(sqli);
          }}
        >
          Promijeni
        </Button>
      </td>
      <td>
        <Button
          className="table-button-ponisti"
          onClick={(event) => {
            event.preventDefault();
            props.deleteSqli(sqli.id);
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
            <th>Korisnik</th>
            <th>Vrijednost</th>
            <th>Kreirano</th>
            <th>Ažurirano</th>
            <th>Promijeni</th>
            <th>Poništi</th>
          </tr>
        </thead>
        <tbody>{sqliList}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default sqliTable;
