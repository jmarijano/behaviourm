import React from "react";
import { Table, Button } from "react-bootstrap";
import "./XssTable.css";

const xssTable = (props) => {
  const xssList = props.xssList.map((xss, i) => (
    <tr key={xss.id}>
      <td>{i + 1}</td>
      <td>{xss.userId}</td>
      <td>{xss.value}</td>
      <td>{xss.text}</td>
      <td>{xss.createdOn}</td>
      <td>{xss.updatedOn}</td>
      <td>
        <Button
          className="table-button-promijeni"
          onClick={(event) => {
            event.preventDefault();
            props.updateXss(xss);
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
            props.deleteXss(xss.id);
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
            <th>Tekst</th>
            <th>Kreirano</th>
            <th>Ažurirano</th>
            <th>Promijeni</th>
            <th>Poništi</th>
          </tr>
        </thead>
        <tbody>{xssList}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default xssTable;
