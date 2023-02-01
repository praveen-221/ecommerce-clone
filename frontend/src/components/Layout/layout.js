import React from 'react';
import Navbar from "../Navbar/Navbar.js";
import SubHeader from "../CategoryHeader";

function Layout(props) {
  return (
    <>
        <Navbar />
        <SubHeader />
        {props.children}
    </>
  )
}

export default Layout;