import React from "react";

import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import "./new.styles.scss";

const New = ({ series, championship }) => {
  const link = championship
    ? `/${series}/championships/${championship}/races/new`
    : `/${series}/championships/new`;
  return (
    <Col xs={6} md={4} lg={3} className="display-container">
      <Container as={Link} to={link} className="display-item">
        +
      </Container>
    </Col>
  );
};

export default New;
