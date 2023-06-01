import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalAceptar = ({
  functionAcept,
  legendButton,
  heading,
  message,
  confirmationButon,
  cancelButton,
  params,
  colorButton,
  colorButtonModal,
  buttonDisable,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleFunction = () => {
    params ? functionAcept(params.index,params.tieneNotas) : functionAcept();
  };
  return (
    <>
      <Button
        disabled={buttonDisable}
        variant="primary"
        onClick={handleShow}
        style={{
          backgroundColor: `${colorButton}`,
          borderColor: `${colorButton}`,
        }}
      >
        {legendButton}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{heading}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {cancelButton}
          </Button>
          <Button
            style={{
              backgroundColor: `${colorButtonModal}`,
              borderColor: `${colorButtonModal}`,
            }}
            variant="primary"
            onClick={() => {
              handleFunction();
              handleClose();
            }}
          >
            {confirmationButon}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalAceptar;
