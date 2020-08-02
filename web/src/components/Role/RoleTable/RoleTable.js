import React from "react";
import { Table, Button } from "react-bootstrap";
import "./RoleTable.css";

const roleTable = (props) => {
  const roleList = props.roleList.map((role, i) => (
    <tr key={role.id}>
      <td>{i + 1}</td>
      <td>{role.name}</td>
      <td>
        <Button
          className="table-button-promijeni"
          onClick={(event) => {
            event.preventDefault();
            props.updateRole(role);
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
            props.deleteRole(role.id)
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
            <th>Naziv role</th>
            <th>Promijeni</th>
            <th>Poništi</th>
          </tr>
        </thead>
        <tbody>{roleList}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default roleTable;
