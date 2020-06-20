import React from "react";

import Item from "../item/item.component";

import "./round-item.styles.scss";

// pass to as string for a Link, onClick function for use in a form.
const RoundItem = ({ chId, _id, name, date }) => {
  const dateObj = new Date(date);
  const timeOptions = {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    timeZoneName: "short",
  };
  const dateString = `${new Intl.DateTimeFormat("en-GB").format(dateObj)}
  ${new Intl.DateTimeFormat("en-GB", timeOptions).format(dateObj)}`;
  return (
    <Item className="round-item" to={`/championship/${chId}/round/${_id}`}>
      <div className="name">{name}</div>
      <div className="date">{dateString}</div>
    </Item>
  );
};

export default RoundItem;
