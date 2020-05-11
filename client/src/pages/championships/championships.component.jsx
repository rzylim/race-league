import React from "react";
import { connect } from "react-redux";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ChampionshipItem from "../../components/championship-item/championship-item.component";
import New from "../../components/new/new.component";

import "./championships.styles.scss";

const ChampionshipsPage = ({
  match: {
    params: { s },
  },
  uiData,
}) => {
  if (!uiData) return <div />;
  const thisSeries = uiData.series.find((ss) => ss.link === s);
  const championships = uiData.championships.filter(
    (ch) => ch.series._id === thisSeries._id
  );
  return (
    <div className="championships-page">
      <h2 className="title">{thisSeries.name} Championships</h2>
      <Container>
        <Row>
          <New series={thisSeries.link} />
          {championships.map(({ _id, game, region, tier }, ind) => (
            <ChampionshipItem
              chId={_id}
              series={thisSeries.link}
              game={game.name}
              region={region.name}
              tier={tier.name}
              colour={tier.colour}
              key={ind}
            />
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
