import React from "react";

import Item from "../item/item.component";

import "./region-item.styles.scss";

// pass to as string for a Link, onClick function for use in a form.
const RegionItem = ({ name, ...otherProps }) => (
  <Item className="region-item" {...otherProps}>
    <div className="name">{name}</div>
  </Item>
);

export default RegionItem;
