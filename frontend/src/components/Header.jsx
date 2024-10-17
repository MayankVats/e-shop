import React from "react"
import { Nav, Navbar, Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { FaShoppingCart, FaUser } from "react-icons/fa"

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <b
                style={{
                  border: "1px solid white",
                  borderRadius: "2px",
                  padding: "2px 4px",
                  marginRight: "4px"
                }}
              >
                E
              </b>
              <span
                style={{
                  paddingBottom: "2px",
                  borderBottom: "1px solid white"
                }}
              >
                shop
              </span>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUser /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
