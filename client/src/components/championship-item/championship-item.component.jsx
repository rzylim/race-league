import React from "react";

import Item from "../item/item.component";

import "./championship-item.styles.scss";

const ChampionshipItem = ({
  chId,
  abbreviation,
  game,
  region,
  tier,
  colour,
}) => (
  <Item className="championship-item" to={`/championship/${chId}`}>
    <div className="abbrv">{abbreviation}</div>
    <div className="game">{game}</div>
    <div className="region">{region}</div>
    <div className="tier" style={{ color: `${colour}` }}>
      Tier {tier}
    </div>
  </Item>
);

export default ChampionshipItem;
