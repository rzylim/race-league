import React from "react";

import { Link } from "react-router-dom";
import Col from "react-bootstrap/Col";

import "./championship-item.styles.scss";

const ChampionshipItem = ({
  chId,
  abbreviation,
  series,
  game,
  region,
  tier,
  colour,
}) => {
  return (
    <Col
      as={Link}
      to={`/${series}/championships/${chId}`}
      className="display-container"
    >
      <div className="display-grid">
        <div className="abbrv">{abbreviation}</div>
        <div className="game">{game}</div>
        <div className="region">{region}</div>
        <div className="tier" style={{ color: `${colour}` }}>
          Tier {tier}
        </div>
      </div>
    </Col>
  );
};

export default ChampionshipItem;
