import Modal from "react-bootstrap/Modal";
import React, { useState, useEffect } from "react";
import { Loader } from "rsuite";

function ConfirmationModal(props) {
  const [isHide, setHide] = useState(true);
  const [isDisable, setDisable] = useState(false);
  const onConfirm = () => {
    setHide(false);
    setDisable(true);
    props.submit();
  };
  return (
    <>
      <Modal show={props.show}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
          <div>
            <span className="close-button" onClick={props.hide}>
              x
            </span>
          </div>
        </Modal.Header>
        <Modal.Body>{props.body}</Modal.Body>
        <Modal.Footer>
          <button className="secondary-button" onClick={props.hide}>
            Close
          </button>
          <button
            className="primary-button"
            onClick={onConfirm}
            disabled={isDisable}
          >
            <span hidden={isHide}>
              <Loader style={{ paddingRight: "5px" }} size="sm" />
            </span>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConfirmationModal;
