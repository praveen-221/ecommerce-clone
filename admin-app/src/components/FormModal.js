import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function FormModal(props) {
  return (
		<Modal show={props.show} onHide={props.handleClose} size={props.size}>
			<Modal.Header closeButton>
				<Modal.Title>{props.modalTitle}</Modal.Title>
			</Modal.Header>
			<Modal.Body>{props.children}</Modal.Body>
			<Modal.Footer>
				{props.buttons ? (
					props.buttons.map((btn, index) => {
						return (
							<Button key={index} variant={btn.color} onClick={btn.onClick}>
								{btn.label}
							</Button>
						);
					})
				) : (
					<Button
						variant="dark"
						{...props}
						style = {{ backgroundColor: "#333" }}
						className="btn-sm"
						onClick={props.onSubmit}
					>
						{props.modalButton}
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	);
}

export default FormModal;