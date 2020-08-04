import React from "react";
import { Table, Button } from "react-bootstrap";
import "./DepartmentTable.css";

const departmentTable = (props) => {
  console.log("Kae: " + props.departmentList);
  const departmentList = props.departmentList.map((department, i) => (
    <tr key={department.id}>
      <td>{i + 1}</td>
      <td>{department.name}</td>
      <td>
        <Button
          className="table-button-promijeni"
          onClick={(event) => {
            event.preventDefault();
            props.updateDepartment(department);
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
            props.deleteDepartment(department.id);
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
            <th>Naziv odjela</th>
            <th>Promijeni</th>
            <th>Poništi</th>
          </tr>
        </thead>
        <tbody>{departmentList}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default departmentTable;
