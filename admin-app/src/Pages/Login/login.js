import React, { useState } from "react";
import Layout from "../../components/Layout/layout";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Container, Row, Col } from "react-bootstrap";
import FormInput from "../../components/FormInput";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function Signin() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const dispatch = useDispatch();
	const auth = useSelector(state => state.auth);

	const userLogin = (e) => {
		e.preventDefault();
		const user = {
			email,
			password
		};
		setEmail('');
		setPassword('');
		dispatch(login(user));
	}
	// check if user is logged in
	if(auth.authenticated){
		return <Navigate to="/"></Navigate>
	}

	return (
		<div>
			<Layout>
				<Container>
					<Row style={{ marginTop: "5rem" }}>
						<Col md={{ span: 6, offset: 3 }}>
							<Form onSubmit={userLogin}>
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
								{/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
									<Form.Check type="checkbox" label="Check me out" />
								</Form.Group> */}
								<Button variant="primary" type="submit">
									Submit
								</Button>
							</Form>
						</Col>
					</Row>
				</Container>
			</Layout>
		</div>
	);
}

export default Signin;
