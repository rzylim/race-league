import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { Container, Accordion, Card, Row } from "react-bootstrap";

import Can from "../../components/can/can.component";
import NewItem from "../../components/new-item/new-item.component";
import SeriesItem from "../../components/series-item/series-item.component";
import RegionItem from "../../components/region-item/region-item.component";
import TierItem from "../../components/tier-item/tier-item.component";
import GameItem from "../../components/game-item/game-item.component";
import CarItem from "../../components/car-item/car-item.component";
import TrackItem from "../../components/track-item/track-item.component";

import "./dashboard.styles.scss";

const DashboardPage = ({
  match: {
    params: { itemType },
  },
  uiData,
}) => (
  <Can
    perform={["dashboard:view"]}
    yes={() => <DashboardPageCore itemType={itemType} uiData={uiData} />}
    no={() => <Redirect to="/" />}
  />
);

const DashboardPageCore = ({ itemType, uiData }) => (
  <Container id="dashboard-page">
    <h2>Dashboard</h2>
    <Accordion defaultActiveKey={itemType}>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="series">
          Series
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="series">
          <Card.Body>
            <Row>
              {<NewItem to="/dashboard/series/new" />}
              {uiData.series.map(({ _id, ...otherProps }) => (
                <SeriesItem
                  key={_id}
                  _id={_id}
                  {...otherProps}
                  to={`/dashboard/series/${_id}`}
                />
              ))}
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="region">
          Regions
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="region">
          <Card.Body>
            <Row>
              {<NewItem to="/dashboard/region/new" />}
              {uiData.regions.map(({ _id, ...otherProps }) => (
                <RegionItem
                  key={_id}
                  _id={_id}
                  {...otherProps}
                  to={`/dashboard/region/${_id}`}
                />
              ))}
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="tier">
          Tiers
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="tier">
          <Card.Body>
            <Row>
              {<NewItem to="/dashboard/tier/new" />}
              {uiData.tiers.map(({ _id, ...otherProps }) => (
                <TierItem
                  key={_id}
                  _id={_id}
                  {...otherProps}
                  to={`/dashboard/tier/${_id}`}
                />
              ))}
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="game">
          Games
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="game">
          <Card.Body>
            <Row>
              {<NewItem to="/dashboard/game/new" />}
              {uiData.games.map(({ _id, ...otherProps }) => (
                <GameItem
                  key={_id}
                  _id={_id}
                  {...otherProps}
                  to={`/dashboard/game/${_id}`}
                />
              ))}
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="car">
          Cars
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="car">
          <Card.Body>
            <Row>
              {<NewItem to="/dashboard/car/new" />}
              {uiData.cars.map(({ _id, ...otherProps }) => (
                <CarItem
                  key={_id}
                  _id={_id}
                  {...otherProps}
                  to={`/dashboard/car/${_id}`}
                />
              ))}
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey="track">
          Tracks
        </Accordion.Toggle>
        <Accordion.Collapse eventKey="track">
          <Card.Body>
            <Row>
              {<NewItem to="/dashboard/track/new" />}
              {uiData.tracks.map(({ _id, ...otherProps }) => (
                <TrackItem
                  key={_id}
                  _id={_id}
                  {...otherProps}
                  to={`/dashboard/track/${_id}`}
                />
              ))}
            </Row>
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  </Container>
);

const mapStateToProps = ({ ui: { uiData } }) => ({
  uiData,
});

export default connect(mapStateToProps)(DashboardPage);
