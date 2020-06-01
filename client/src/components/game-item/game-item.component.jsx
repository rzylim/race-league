import React from "react";

import Item from "../item/item.component";

import "./game-item.styles.scss";

// pass to as string for a Link, onClick function for use in a form.
const GameItem = ({ name, ...otherProps }) => (
  <Item className="game-item" {...otherProps}>
    <div className="name">{name}</div>
  </Item>
);

export default GameItem;
