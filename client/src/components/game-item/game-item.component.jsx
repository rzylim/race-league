import React from "react";

import Item from "../item/item.component";

import "./game-item.styles.scss";

const GameItem = ({ gameId, name }) => (
  <Item className="game-item" to={`/games/${gameId}`}>
    <div className="name">{name}</div>
  </Item>
);

export default GameItem;
