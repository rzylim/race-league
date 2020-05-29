import React from "react";

import Item from "../item/item.component";

import "./region-item.styles.scss";

const RegionItem = ({ regionId, name }) => (
  <Item className="region-item" to={`/regions/${regionId}`}>
    <div className="name">{name}</div>
  </Item>
);

export default RegionItem;
