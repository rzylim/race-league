import React from "react";

import Item from "../item/item.component";

import "./round-item.styles.scss";

// pass to as string for a Link, onClick function for use in a form.
const RoundItem = ({ name, ...otherProps }) => (
  <Item className="round-item" {...otherProps}>
    <div className="name">{name}</div>
    <div className="date">{date}</div>
  </Item>
);

export default RoundItem;
