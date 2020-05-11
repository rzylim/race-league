import React from "react";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DisplayItem from "../../components/display-item/display-item.component";

import "./championships.styles.scss";

const ChampionshipsPage = ({
  match: {
    params: { s },
  },
  uiData,
}) => {
  if (!uiData) return <div />;
  const thisSeries = uiData.series.find((ss) => ss.link === s);
  return (
    <div className="championships-page">
      <h2 className="title">{thisSeries.name} Championships</h2>
      <Container>
        <Row>
          {/* add item to create new championship */}
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <DisplayItem num={num} key={num} />
          ))}
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ ui: { uiData } }) => ({
  uiData,
});

export default connect(mapStateToProps)(ChampionshipsPage);
