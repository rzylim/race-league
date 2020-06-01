import React from "react";

import Item from "../item/item.component";

import "./tier-item.styles.scss";

// pass to as string for a Link, onClick function for use in a form.
const TierItem = ({ _id, name, colour, ...otherProps }) => (
  <Item className="tier-item" {...otherProps}>
    <div className="name" style={{ color: `${colour}` }}>
      {name}
    </div>
  </Item>
);

export default TierItem;
