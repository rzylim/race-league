import React from "react";

import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";

import "./display-item.styles.scss";

const DisplayItem = ({ num }) => {
  return (
    <Col as={Link} to="/" className="championship-container">
      <div className="display-item">
        <div className="name">Name</div>
        <div className="region">Oceania</div>
        <div className="tier">Tier 1</div>
      </div>
    </Col>
  );
};

export default DisplayItem;
