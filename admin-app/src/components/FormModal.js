import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function FormModal(props) {
  return (
		<Modal show={props.show} onHide={props.handleClose} size={props.size}>
			<Modal.Header closeButton>
				<Modal.Title>{props.modalTitle}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				{props.children}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={props.handleClose}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default FormModal;