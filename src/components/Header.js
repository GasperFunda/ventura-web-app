import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Cookies from "universal-cookie";
function Header(props) {
  const [isLogined, setIsLogined] = useState(false);
  useEffect(() => {
    var cookies = new Cookies();
    const id = cookies.get("userId");
    if (id) {
      setIsLogined(true);
    }
  }, []);

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
        {isLogined && (
          <Navbar.Brand
            href="/yourActivities"
            style={{ marginLeft: "35px", fontSize: "26px" }}
          >
            Your activities
          </Navbar.Brand>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
          {!isLogined ? (
            <Nav className="mr-auto">
              <Nav.Link href="/login" style={{ fontSize: "24px" }}>
                Login
              </Nav.Link>
              <Nav.Link href="/register" style={{ fontSize: "24px" }}>
                Register
              </Nav.Link>
            </Nav>
          ) : (
            <Nav className="mr-auto">
              <Nav.Link href="/compass" style={{ fontSize: "24px" }}>
                Compass
              </Nav.Link>
              <Nav.Link href="/profile" style={{ fontSize: "24px" }}>
                Profile
              </Nav.Link>
              <Nav.Link href="/logout" style={{ fontSize: "24px" }}>
                Log out
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
