import React from "react";
import BSNavbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const Navbar = () => (
  <BSNavbar bg="mob" expand="lg" variant="mob">
    <Container>
      <BSNavbar.Brand enzymeid="navbarBrand">
        My Outstanding Balance
      </BSNavbar.Brand>
      <BSNavbar.Toggle
        enzymeid="navbarToggle"
        aria-controls="basic-navbar-nav"
      />
      <BSNavbar.Collapse enzymeid="navbarCollapse" id="basic-navbar-nav">
        <div />
      </BSNavbar.Collapse>
    </Container>
  </BSNavbar>
);

export default Navbar;
