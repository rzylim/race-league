import React from "react";
import { connect } from "react-redux";

import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";

import Can from "../../components/can/can.component";

import "./round.styles.scss";

const RoundPage = ({
  match: {
    params: { parentItemId, itemId },
  },
  uiData,
}) => {
  // wait for ui data to load.
  if (!uiData) return null;

  const championship = uiData.championships[parentItemId];
  const round = championship.rounds[itemId];
  console.log("round", round);

  return (
    <Container id="round-page">
      <Row>
        <Col>
          <h2 className="round-name">{round.name}</h2>
        </Col>
        <Can
          perform={["championships:edit"]}
          on={{ championshipId: parentItemId }}
          yes={() => (
            <Col id="edit-btn-col" xs={1}>
              <Button
                as={Link}
                to={`/championship/${parentItemId}/round/${itemId}/edit`}
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

export default connect(mapStateToProps)(RoundPage);
