import React from "react";

import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import "./item.styles.scss";

const Item = ({ children, to, className }) => (
  <Col xs={6} md={4} lg={3} className={className + " display-container"}>
    <Container as={Link} to={to} className="display-grid">
      {children}
    </Container>
  </Col>
);

export default Item;
