// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";

function ModalUi() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow}>Launch demo modal</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <button className="secondary-button" onClick={handleClose}>
            Close
          </button>
          <button className="primary-button" onClick={handleShow}>
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalUi;
