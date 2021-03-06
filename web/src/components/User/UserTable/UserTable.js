import React from "react";
import { Table, Button } from "react-bootstrap";
import "./UserTable.css";

const userTable = (props) => {
  const userList = props.userList.map((user, i) => (
    <tr key={user.id}>
      <td>{i + 1}</td>
      <td>{user.name}</td>
      <td>{user.surname}</td>
      <td>{user.email}</td>
      <td>{user.roleId}</td>
      <td>{user.departmentId}</td>
      <td>{user.addressId}</td>
      <td>{user.createdOn}</td>
      <td>{user.updatedOn}</td>
      <td>
        <Button
          variant="warning"
          onClick={(event) => {
            event.preventDefault();
            props.updateUser(user);
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
            props.deleteUser(user.id);
          }}
        >
          Obriši
        </Button>
      </td>
    </tr>
  ));
  return (
    <React.Fragment>
      <Table bordered hover className="data-table" responsive>
        <thead>
          <tr>
            <th>Redni broj</th>
            <th>Ime osobe</th>
            <th>Prezime osobe</th>
            <th>Email adresa</th>
            <th>Uloga</th>
            <th>Odjel</th>
            <th>Adresa</th>
            <th>Kreirano</th>
            <th>Ažurirano</th>
            <th>Promijeni</th>
            <th>Poništi</th>
          </tr>
        </thead>
        <tbody>{userList}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default userTable;
