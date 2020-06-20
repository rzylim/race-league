import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import Can from "../../components/can/can.component";
import NewItem from "../../components/new-item/new-item.component";
import RoundItem from "../../components/round-item/round-item.component";

import "./championship.styles.scss";

const ChampionshipPage = ({
  match: {
    params: { chId },
  },
  uiData,
}) => {
  // wait for ui data to load.
  if (!uiData) return null;

  const ch = uiData.championships[chId];
  console.log(ch);

  return (
    <Container id="championship-page">
      <Row>
        <Col>
          <h2 className="championship-name">{ch.name}</h2>
        </Col>
        <Can
          perform={["series:edit"]}
          on={{ seriesId: ch.series._id }}
          yes={() => (
            <Col id="edit-btn-col" xs={1}>
              <Button
                as={Link}
                to={`/championship/${chId}/edit`}
                variant="secondary"
                id="edit-btn"
              >
                Edit
              </Button>
            </Col>
          )}
          no={() => null}
        />
      </Row>
      <Row>
        <Col>
          <h3>Tables</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Rounds</h3>
        </Col>
      </Row>
      <Row>
        <Can
          perform={["championships:edit"]}
          on={{ seriesId: ch.series._id, championshipId: ch._id }}
          yes={() => <NewItem to={`/championship/${ch._id}/round/new`} />}
          no={() => null}
        />
        {Object.entries(ch.rounds).map(([key, value]) => (
          <RoundItem key={key} chId={chId} {...value} />
        ))}
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ ui: { uiData } }) => ({
  uiData,
});

export default connect(mapStateToProps)(ChampionshipPage);
