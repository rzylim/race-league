import React from "react";

import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import "./championship-item.styles.scss";

const ChampionshipItem = ({
  chId,
  abbreviation,
  seriesLink,
  game,
  region,
  tier,
  colour,
}) => {
  return (
    <Col xs={6} md={4} lg={3} className="display-container">
      <Container
        as={Link}
        to={`/${seriesLink}/championships/${chId}`}
        className="display-grid"
      >
        <div className="abbrv">{abbreviation}</div>
        <div className="game">{game}</div>
        <div className="region">{region}</div>
        <div className="tier" style={{ color: `${colour}` }}>
          Tier {tier}
        </div>
      </Container>
    </Col>
  );
};

export default ChampionshipItem;
