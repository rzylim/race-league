import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Accordian from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";

import Can from "../../components/can/can.component";
import NewItem from "../../components/new-item/new-item.component";
import SeriesItem from "../../components/series-item/series-item.component";
import RegionItem from "../../components/region-item/region-item.component";
import TierItem from "../../components/tier-item/tier-item.component";
import GameItem from "../../components/game-item/game-item.component";
import CarItem from "../../components/car-item/car-item.component";
import TrackItem from "../../components/track-item/track-item.component";

import "./dashboard.styles.scss";

const DashboardPage = ({ uiData }) => (
  <Can
    perform={["dashboard:view"]}
    yes={() => <DashboardPageCore uiData={uiData} />}
    no={() => <Redirect to="/" />}
  />
);

const DashboardPageCore = ({ uiData }) => (
  <Container id="dashboard-page">
    <h2>Dashboard</h2>
    <Accordian>
      <Card>
        <Accordian.Toggle as={Card.Header} eventKey="series">
          Series
        </Accordian.Toggle>
        <Accordian.Collapse eventKey="series">
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
        </Accordian.Collapse>
      </Card>
      <Card>
        <Accordian.Toggle as={Card.Header} eventKey="regions">
          Regions
        </Accordian.Toggle>
        <Accordian.Collapse eventKey="regions">
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
        </Accordian.Collapse>
      </Card>
      <Card>
        <Accordian.Toggle as={Card.Header} eventKey="tiers">
          Tiers
        </Accordian.Toggle>
        <Accordian.Collapse eventKey="tiers">
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
        </Accordian.Collapse>
      </Card>
      <Card>
        <Accordian.Toggle as={Card.Header} eventKey="games">
          Games
        </Accordian.Toggle>
        <Accordian.Collapse eventKey="games">
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
        </Accordian.Collapse>
      </Card>
      <Card>
        <Accordian.Toggle as={Card.Header} eventKey="cars">
          Cars
        </Accordian.Toggle>
        <Accordian.Collapse eventKey="cars">
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
        </Accordian.Collapse>
      </Card>
      <Card>
        <Accordian.Toggle as={Card.Header} eventKey="tracks">
          Tracks
        </Accordian.Toggle>
        <Accordian.Collapse eventKey="tracks">
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
        </Accordian.Collapse>
      </Card>
    </Accordian>
  </Container>
);

const mapStateToProps = ({ ui: { uiData } }) => ({
  uiData,
});

export default connect(mapStateToProps)(DashboardPage);
