import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const modalheader = {
  borderBottom: "none"
};
const modalStyle = {
  border: "none",
  display: 'flex',
  alignItems: "start"
};

const ModalError = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal animation show={isOpen} style={modalheader}>
        <Modal.Header closeButton onClick={onClose} style={modalStyle} >
          <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
  );
};

const ModalInfo =  ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal animation show={isOpen} style={modalheader}>
        <Modal.Header closeButton onClick={onClose} style={modalStyle}>
          <Modal.Title>{ title }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
      </Modal>
  );
};

export default ModalError;