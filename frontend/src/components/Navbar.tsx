import React from 'react';
import { Container, Nav, Navbar as NavbarBs, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useShoppingCart } from "../context/ShoppingCartContext";

export function Navbar() {
  const { openCart, cartQuantity } = useShoppingCart();

  return (
    <NavbarBs sticky="top" className="shadow-sm mb-3" style={{ backgroundColor: "#63815C" }}>
      <Container className="d-flex justify-content-between align-items-center">
        <NavbarBs.Brand className="d-flex align-items-center">
          <img
            src="../../imgs/feza logo.png"
            alt="Logo"
            style={{ width: "70px", height: "70px", marginRight: "20px" }}
          />
          <span style={{ color: "#fff", fontSize: "1.5rem", fontWeight: "bold" }}>Yazgit Feza</span>
        </NavbarBs.Brand>

        <Nav className="me-auto">
          <Nav.Link to="/" as={NavLink} style={{ color: "#fff", fontSize: "1.2rem" }}>
            Bağış Yap
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink} style={{ color: "#fff", fontSize: "1.2rem" }}>
            Biz Kimiz?
          </Nav.Link>
        </Nav>

        <div className="d-flex align-items-center">
          <a href="https://github.com/aybarsayan" target="_blank" rel="noopener noreferrer" className="me-3">
            <img src="../../imgs/github.svg" alt="GitHub" style={{ width: "24px", height: "24px" }} />
          </a>
          <a href="https://www.instagram.com/yazgitfeza/" target="_blank" rel="noopener noreferrer" className="me-3">
            <img src="../../imgs/Instagram_logo.svg" alt="Instagram" style={{ width: "24px", height: "24px" }} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="me-3">
            <img src="../../imgs/LinkedIn_icon.svg" alt="LinkedIn" style={{ width: "24px", height: "24px" }} />
          </a>

          {cartQuantity > 0 && (
            <Button
              onClick={openCart}
              style={{ 
                width: "3rem", 
                height: "3rem", 
                position: "relative", 
                backgroundColor: "#395b91", 
                borderColor: "#395b91", 
                color: "#fff" 
              }}
              className="rounded-circle"
            >
              {cartQuantity}
            </Button>
          )}
        </div>
      </Container>
    </NavbarBs>
  );
}