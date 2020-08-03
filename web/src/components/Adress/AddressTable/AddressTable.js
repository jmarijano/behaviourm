import React from "react";
import { Table, Button } from "react-bootstrap";
import "./AddressTable.css";

const addressTable = (props) => {
  const addressList = props.addressList.map((address, i) => (
    <tr key={address.id}>
      <td>{i + 1}</td>
      <td>{address.streetName}</td>
      <td>{address.cityId}</td>
      <td>
        <Button
          className="table-button-promijeni"
          onClick={(event) => {
            event.preventDefault();
            props.updateAddress(address);
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
            props.deleteAddress(address.id);
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
            <th>Ulica</th>
            <th>Grad</th>
            <th>Promijeni</th>
            <th>Poništi</th>
          </tr>
        </thead>
        <tbody>{addressList}</tbody>
      </Table>
    </React.Fragment>
  );
};

export default addressTable;
