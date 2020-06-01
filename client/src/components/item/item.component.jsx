import React from "react";

import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import "./item.styles.scss";

const Item = ({ children, className, to, onClick }) => (
  <Col xs={6} md={4} lg={3} className="display-item">
    {to ? (
      <Container as={Link} to={to} className={"display-grid " + className}>
        {children}
      </Container>
    ) : (
      <Container onClick={onClick} className={"display-grid " + className}>
        {children}
      </Container>
    )}
  </Col>
);

export default Item;
