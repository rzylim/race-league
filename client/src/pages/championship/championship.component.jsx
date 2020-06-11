import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import Can from "../../components/can/can.component";

import "./championship.styles.scss";

const ChampionshipPage = ({
  match: {
    params: { s, chId },
  },
  uiData,
}) => {
  // wait for ui data to load.
  if (!uiData) return null;
  const thisSeries = uiData.series.find((e) => e.link === s);

  return (
    <Container id="championship-page">
      <Row>
        <Col>
          <h2>Championship</h2>
        </Col>
        <Can
          perform={["series:edit"]}
          on={{ seriesId: thisSeries._id }}
          yes={() => (
            <Col id="edit-btn-col">
              <Button
                as={Link}
                to={`/${s}/championship/${chId}/edit`}
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
    </Container>
  );
};

const mapStateToProps = ({ ui: { uiData } }) => ({
  uiData,
});

export default connect(mapStateToProps)(ChampionshipPage);
