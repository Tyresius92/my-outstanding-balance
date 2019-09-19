import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

const MobNavbar = () => (
  <Navbar bg="mob" expand="lg" variant="mob">
    <Container>
      <Navbar.Brand enzymeid="navbarBrand">My Outstanding Balance</Navbar.Brand>
      <Navbar.Toggle enzymeid="navbarToggle" aria-controls="basic-navbar-nav" />
      <Navbar.Collapse enzymeid="navbarCollapse" id="basic-navbar-nav">
        <div />
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default MobNavbar;
