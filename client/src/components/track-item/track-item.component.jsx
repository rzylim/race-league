import React from "react";

import Item from "../item/item.component";

import "./track-item.styles.scss";

// pass to as string for a Link, onClick function for use in a form.
const TrackItem = ({ name, year, ...otherProps }) => (
  <Item className="track-item" {...otherProps}>
    <div className="name">{name}</div>
    <div className="year">{year}</div>
  </Item>
);

export default TrackItem;
