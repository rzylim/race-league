import React from "react";

import Item from "../item/item.component";

import "./driver-item.styles.scss";

// pass to as string for a Link, onClick function for use in a form.
const DriverItem = ({ username, ...otherProps }) => (
  <Item className="driver-item" {...otherProps}>
    <div className="username">{username}</div>
  </Item>
);

export default DriverItem;
