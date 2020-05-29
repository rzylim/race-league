import React from "react";

import Item from "../item/item.component";

import "./tier-item.styles.scss";

const TierItem = ({ tierId, name, colour }) => (
  <Item className="tier-item" to={`/tiers/${tierId}`}>
    <div className="name" style={{ color: `${colour}` }}>
      {name}
    </div>
  </Item>
);

export default TierItem;
