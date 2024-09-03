import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export function Footer() {
  return (
    <footer className="py-4 mt-auto" style={{ backgroundColor: "#43787a", color: "white", paddingTop: "20px" }}>
      <Container>
        <Row className="text-center">
          <Col md={4}>
            <h5>YAZGİT Feza</h5>
            <p>Global ve Ölçeklendirilebilir Bağış</p>
            <div className="d-flex justify-content-center mt-3">
              <a href="https://github.com/aybarsayan" target="_blank" rel="noopener noreferrer" className="me-3">
                <img src="../../imgs/github.svg" alt="GitHub" style={{ width: "24px", height: "24px" }} />
              </a>
              <a href="https://www.instagram.com/yazgitfeza/" target="_blank" rel="noopener noreferrer" className="me-3">
                <img src="../../imgs/Instagram_logo.svg" alt="Instagram" style={{ width: "24px", height: "24px" }} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <img src="../../imgs/LinkedIn_icon.svg" alt="LinkedIn" style={{ width: "24px", height: "24px" }} />
              </a>
            </div>
          </Col>
          <Col md={4}>
            <h5>Bağlantılar</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white">
                  Ana Sayfa
                </a>
              </li>
              <li>
                <a href="/about" className="text-white">
                  Biz Kimiz?
                </a>
              </li>
              <li>
                <a href="/about" className="text-white">
                  İletişim
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Takım</h5>
            <ul className="list-unstyled">
              <li>
                <a href="https://www.linkedin.com/in/aybarsayan/" target="_blank" rel="noopener noreferrer" className="text-white">
                  Aybars Göktuğ AYAN
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/irem-karaba%C5%9F-b45b6431a/" target="_blank" rel="noopener noreferrer" className="text-white">
                  İrem KARABAŞ
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/yenal-ko%C3%A7er/" target="_blank" rel="noopener noreferrer" className="text-white">
                  Yenal KOÇER
                </a>
              </li>
            </ul>
          </Col>
        </Row>
        <hr style={{ backgroundColor: "white" }} />
        <Row className="mt-3">
          <Col className="text-center">
            <small>&copy; 2024 Yazgit Feza. Tüm hakları saklıdır.</small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}