import React from "react";
import { Button, Modal } from "react-bootstrap";

const modal = (props) => {
  
  const handleClose = () => {
    this.show = false;
  };

  return (
    <Modal show={true} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>{this.props.body}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Zatvori
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default modal;
