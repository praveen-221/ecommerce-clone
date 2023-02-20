import React from 'react';
import "./layout.css";
import Navbar from "../NavBar";
import { Row, Col, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Layout(props) {
  return (
    <div>
        <Navbar />
        <Container fluid>
          {
            props.sidebar ?
            <Row>
              <Col md={2} className="sidebar">
                <ul>
                  <li><NavLink to={'/'}>Home</NavLink></li>
                  <li><NavLink to={'/page'}>Page</NavLink></li>
                  <li><NavLink to={'/products'}>Products</NavLink></li>
                  <li><NavLink to={'/orders'}>Orders</NavLink></li>
                  <li><NavLink to={'/categories'}>Categories</NavLink></li>
                </ul>
              </Col>
              <Col md={10} style={{marginLeft: "auto", paddingTop: "60px"}}>{props.children}</Col>
            </Row> 
            :
            props.children
          }
        </Container>
    </div>
  )
}

export default Layout;