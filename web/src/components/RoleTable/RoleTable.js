import React from 'react';
import { Table, Button } from 'react-bootstrap';
import "./RoleTable.css";

const roleTable = (props) => {
    const roleList = props.roleList.map((role, i) => (
        <tr key={role.id}>
            <td>{i + 1}</td>
            <td>{role.name}</td>
        </tr>
    ));
    return (
        <React.Fragment>
            <Table bordered hover className="data-table">
                <thead>
                    <tr>
                        <th>Redni broj</th>
                        <th>Naziv role</th>
                    </tr>
                </thead>
                <tbody>
                    {roleList}
                </tbody>
            </Table>
        </React.Fragment>
    );
};

export default roleTable;