import React from "react";

import Item from "../item/item.component";

import "./car-item.styles.scss";

// pass to as string for a Link, onClick function for use in a form.
const CarItem = ({ make, model, year, ...otherProps }) => (
  <Item className="car-item" {...otherProps}>
    <div className="make">{make}</div>
    <div className="model">{model}</div>
    <div className="year">{year}</div>
  </Item>
);

export default CarItem;
