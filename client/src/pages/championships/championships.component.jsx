import React from "react";
import { connect } from "react-redux";

const ChampionshipsPage = ({
  match: {
    params: { s },
  },
  uiData,
}) => {
  if (!uiData) return <div />;
  const thisSeries = uiData.series.find((ss) => ss.link === s);
  return <h2>{thisSeries.name} Championships</h2>;
};

const mapStateToProps = ({ ui: { uiData } }) => ({
  uiData,
});

export default connect(mapStateToProps)(ChampionshipsPage);
