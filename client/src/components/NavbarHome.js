import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
// import { useShoppingCart } from "../context/ShoppingCartContext"

export default function NavbarHome() {
  return (
    <NavbarBs sticky="top" className="bg-info  shadow-sm mb-3 " expand="sm">
      <Container>
        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink} style={{ color: "white" }}>
            Home
          </Nav.Link>
          <Nav.Link to="/signin" as={NavLink} style={{ color: "white" }}>
            Login
          </Nav.Link>
          <Nav.Link to="/signup" as={NavLink} style={{ color: "white" }}>
            Sign-up
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBs>
  );
}
