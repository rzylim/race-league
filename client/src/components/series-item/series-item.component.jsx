import React from "react";

import Item from "../item/item.component";

import "./series-item.styles.scss";

// pass to as string for a Link, onClick function for use in a form.
const SeriesItem = ({ name, ...otherProps }) => (
  <Item className="series-item" {...otherProps}>
    <div className="name">{name}</div>
  </Item>
);

export default SeriesItem;
