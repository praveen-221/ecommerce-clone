import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link } from "react-router-dom";
import { signout } from "../actions";

// import {Navbar, Nav, }

function NavBar() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const logout = () => {
		dispatch(signout());
	}
	const renderLogin = () => {
		return (
			<Nav>
				{/* <Nav.Link href="#signin">SignIn</Nav.Link> */}
				<li className="nav-item">
					<NavLink to="/signup" className="nav-link">
						SignUp
					</NavLink>
				</li>
				<li className="nav-item">
					<NavLink to="/login" className="nav-link">
						Login
					</NavLink>
				</li>
			</Nav>
		);
	};
	const renderSignout = () => {
		return (
			<Nav>
				<li className="nav-item">
					<span className="nav-link" onClick={logout} style={{ cursor: "pointer"}}>
						SignOut
					</span>
				</li>
			</Nav>
		);
	};

	return (
		<div>
			<Navbar
				collapseOnSelect
				fixed="top"
				expand="lg"
				bg="dark"
				variant="dark"
				style={{ zIndex: 1 }}
			>
				<Container>
					{/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
					<Link to="/" className="navbar-brand">
						Admin Dashboard
					</Link>
					<Navbar.Toggle aria-controls="responsive-navbar-nav" />
					<Navbar.Collapse id="responsive-navbar-nav">
						<Nav className="me-auto">
							{/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
								<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.2">
									Another action
								</NavDropdown.Item>
								<NavDropdown.Item href="#action/3.3">
									Something
								</NavDropdown.Item>
								<NavDropdown.Divider />
								<NavDropdown.Item href="#action/3.4">
									Separated link
								</NavDropdown.Item>
							</NavDropdown> */}
						</Nav>
						{auth.authenticated ? renderSignout() : renderLogin()}
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</div>
	);
}

export default NavBar;
