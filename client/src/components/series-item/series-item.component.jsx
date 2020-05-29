import React from "react";

import Item from "../item/item.component";

import "./series-item.styles.scss";

const SeriesItem = ({ seriesId, name }) => (
  <Item className="series-item" to={`/series/${seriesId}`}>
    <div className="name">{name}</div>
  </Item>
);

export default SeriesItem;
