import React from "react";

import Item from "../item/item.component";

import "./car-item.styles.scss";

const CarItem = ({ carId, make, model, year }) => (
  <Item className="car-item" to={`/cars/${carId}`}>
    <div className="make">{make}</div>
    <div className="model">{model}</div>
    <div className="year">{year}</div>
  </Item>
);

export default CarItem;
