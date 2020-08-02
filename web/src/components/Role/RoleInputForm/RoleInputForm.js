import React from 'react'
import "./RoleInputForm.css";
import { Button } from "react-bootstrap";

const roleInputForm = (props) => {
    return (
        <form className="role-input-form" onSubmit={(e) => { props.handleRoleSubmit(e) }}>
            <label className="input-label">
                Ime:
                <input
                    className="input-field"
                    name="name"
                    type="text"
                    defaultValue={props.role.name}
                    onChange={(event) => props.onChangeInput(event)}></input>
            </label>

            <Button type="submit" >Spremi</Button>
        </form>
    );
}

export default roleInputForm;