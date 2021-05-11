import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
function Header(props) {
  return (
    <div>
      <Navbar
        expand="lg"
        style={{ borderBottom: "1px solid grey", margin: "0px 5%" }}
      >
        <Navbar.Brand
          href="/"
          style={{ color: "#e67373", marginLeft: "15px", fontSize: "36px" }}
        >
          Ventura
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          <Nav className="mr-auto" inline>
            <Nav.Link href="/login" style={{ fontSize: "24px" }}>
              Login
            </Nav.Link>
            <Nav.Link href="/register" style={{ fontSize: "24px" }}>
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
