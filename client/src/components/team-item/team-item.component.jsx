import React from "react";

import Item from "../item/item.component";

import "./team-item.styles.scss";

// pass to as string for a Link, onClick function for use in a form.
const TeamItem = ({ name, ...otherProps }) => (
  <Item className="region-item" {...otherProps}>
    <div className="name">{name}</div>
  </Item>
);

export default TeamItem;
