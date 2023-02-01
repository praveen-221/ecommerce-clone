import React, { useState } from "react";
import Layout from "../../components/Layout/layout.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import FormInput from "../../components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { signup } from "../../actions";
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';

// const Alert = React.forwardRef(function Alert(props, ref) {
// 	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
// });

function Signup() {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [open, setOpen] = useState(false);
	const auth = useSelector(state => state.auth);
	const user = useSelector(state => state.register);
	const dispatch = useDispatch();

	const userSignup = (e) => {
		e.preventDefault();
		const newUser = { firstName, lastName, email, password };
		setFirstName('');
		setLastName('');
		setEmail('');
		setPassword('');
		dispatch(signup(newUser));
	}
	// Mui Snackbar for alerts
	/*const handleClick = () => {
		setOpen(true);
	};
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
		  return;
		}
	
		setOpen(false);
  	};*/
	
	// check if user is logged in
	if(auth.authenticated){
		return <Navigate to="/"></Navigate>
	}
	// Loading check
	if(user.loading) {
		return <h4>Loading...</h4>
	}
	if(user.severity === "success"){
		return <Navigate to="/"></Navigate>
	}

	return (
		<div>
			<Layout>
				<Container>
					<Row style={{ marginTop: "5rem" }}>
						<Col md={{ span: 6, offset: 3 }}>
							<Form onSubmit={userSignup}>
								<Row>
									<Col md={6}>
										<FormInput
											label="First Name"
											type="text"
											placeholder="John"
											value={firstName}
											onChange={(e) => setFirstName(e.target.value)}
										/>
									</Col>
									<Col md={6}>
										<FormInput
											label="Last Name"
											type="text"
											placeholder="Doe"
											value={lastName}
											onChange={(e) => setLastName(e.target.value)}
										/>
									</Col>
								</Row>
								<FormInput
									label="Email Address"
									placeholder="johndoe@email.com"
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
								<FormInput
									label="Password"
									type="password"
									placeholder="password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
								<Form.Group className="mb-3" controlId="formBasicCheckbox">
									<Form.Check
										type="checkbox"
										label="Agree to Terms & Conditions"
										defaultChecked = "true"
									/>
								</Form.Group>
								<Button variant="primary" type="submit">
									Submit
								</Button>
								{/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{vertical: "top", horizontal: "right"}}>
									<Alert onClose={handleClose} severity={user.severity} sx={{ width: '100%' }}>
										{user.message}
									</Alert>
								</Snackbar> */}
							</Form>
						</Col>
					</Row>
				</Container>
			</Layout>
		</div>
	);
}

export default Signup;
