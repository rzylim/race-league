import React from "react";

import Item from "../item/item.component";

import "./new-item.styles.scss";

// pass to as string for a Link, onClick function for use in a form.
const New = (props) => (
  <Item className="new-item" {...props}>
    <div className="plus">+</div>
  </Item>
);

export default New;
