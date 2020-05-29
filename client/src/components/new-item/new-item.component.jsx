import React from "react";

import Item from "../item/item.component";

import "./new-item.styles.scss";

const New = ({ to }) => (
  <Item className="new-item" to={to}>
    <div className="plus">+</div>
  </Item>
);

export default New;
