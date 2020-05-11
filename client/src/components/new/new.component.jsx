import React from "react";

import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";

import "./new.styles.scss";

const New = ({ series, championship }) => {
  const link = championship
    ? `/${series}/championships/${championship}/races/new`
    : `/${series}/championships/new`;
  return (
    <Col as={Link} to={link} className="display-container">
      <div className="display-item">+</div>
    </Col>
  );
};

export default New;
