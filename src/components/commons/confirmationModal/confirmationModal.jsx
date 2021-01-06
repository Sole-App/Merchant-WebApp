import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ConfirmationModal = ({
  className = "",
  isOpen = false,
  title = "",
  body = "",
  submitButtonText = "Submit",
  cancelButtonText = "Cancel",
  onSubmit,
  onCancel,
}) => {
  return (
    <Modal isOpen={isOpen} className={className}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={onSubmit}>
          {submitButtonText}
        </Button>{" "}
        <Button color="secondary" onClick={onCancel}>
          {cancelButtonText}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;
