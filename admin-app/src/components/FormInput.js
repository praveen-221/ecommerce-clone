import React from "react";
import Form from "react-bootstrap/Form";

function FormInput(props) {
	let input = null;
	// switch(props.type) {
	// 	case 'text':
	// 		break;
	// 	case 'select':
	// 		input = (
	// 			<div>
	// 				<Form.Group className="mb-3">
	// 					<select
	// 						className="form-control form-control-sm"
	// 						value={props.value}
	// 						onChange={props.onChange}
	// 					>
	// 						<option value="">{props.placeholder}</option>
	// 						{props.options.length > 0
	// 							? props.options.map((option, index) => {
	// 									<option key={index} value={option.value}>
	// 										{option.name}
	// 									</option>;
	// 							  })
	// 							: null}
	// 					</select>
	// 				</Form.Group>
	// 			</div>
	// 		);
	// 		break;
	// 	default:
	// 		input = (
	// 			<div>
	// 				<Form.Group className="mb-3">
	// 					{props.label && <Form.Label>{props.label}</Form.Label>}
	// 					<Form.Control
	// 						type={props.type}
	// 						placeholder={props.placeholder}
	// 						value={props.value}
	// 						onChange={props.onChange}
	// 						{...props}
	// 						required
	// 					/>
	// 					<Form.Text className="text-muted">{props.errMessage}</Form.Text>
	// 				</Form.Group>
	// 			</div>
	// 		);
	// 		break;
	// }
	return (
		<div>
			<Form.Group className="mb-3">
				{props.label && <Form.Label>{props.label}</Form.Label>}
				<Form.Control
					type={props.type}
					placeholder={props.placeholder}
					value={props.value}
					onChange={props.onChange}
					{...props}
					required
				/>
				<Form.Text className="text-muted">{props.errMessage}</Form.Text>
			</Form.Group>
		</div>
	);
}

export default FormInput;
