import React from "react";

import Item from "../item/item.component";

import "./track-item.styles.scss";

const TrackItem = ({ trackId, name, year }) => (
  <Item className="track-item" to={`/dashboard/track/${trackId}`}>
    <div className="name">{name}</div>
    <div className="year">{year}</div>
  </Item>
);

export default TrackItem;
