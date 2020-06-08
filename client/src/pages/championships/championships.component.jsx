import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { isEqual } from "lodash";

import {
  Container,
  Accordion,
  Card,
  Row,
  Col,
  Form as BSForm,
} from "react-bootstrap";

import ChampionshipItem from "../../components/championship-item/championship-item.component";
import Can from "../../components/can/can.component";
import NewItem from "../../components/new-item/new-item.component";

import { useFilterState } from "./championships.hooks.js";

import "./championships.styles.scss";

const initialStateReducer = (acc, item) => ({
  ...acc,
  [item.name]: true,
});

const getNewFilterSelection = (subSelection, set, specialValue) =>
  Object.entries(subSelection).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: set.has(key)
        ? value === specialValue
          ? true
          : value
        : specialValue,
    }),
    {}
  );

const ChampionshipsPage = ({
  match: {
    params: { s },
  },
  uiData,
}) => {
  // wait for ui data to load.
  if (!uiData) return null;
  const thisSeries = uiData.series.find((e) => e.link === s);
  // return to dashboard if item type doesn't exist.
  if (!thisSeries) return <Redirect to="/" />;

  return (
    <ChampionshipsPageCore s={s} uiData={uiData} thisSeries={thisSeries} />
  );
};

const ChampionshipsPageCore = ({ s, uiData, thisSeries }) => {
  let initialState = {
    series: uiData.series.reduce(initialStateReducer, {}),
    region: uiData.regions.reduce(initialStateReducer, {}),
    tier: uiData.tiers.reduce(initialStateReducer, {}),
    game: uiData.games.reduce(initialStateReducer, {}),
    search: "",
  };

  const { selection, setFilter, handleChange } = useFilterState(initialState);

  let newFilterSelection = {};
  // handle changes in route parameter
  // set to prevent infinite processing of address series parameter
  const [prevLink, setPrevLink] = useState(null);
  if (s && prevLink !== s) {
    setPrevLink(s);
    newFilterSelection.series = uiData.series.reduce(
      (acc, se) =>
        se.name === thisSeries.name
          ? { ...acc, [se.name]: true }
          : { ...acc, [se.name]: false },
      {}
    );
  }

  // regenerate other checkboxes if series selection has changed.
  const [prevSeriesSelection, setPrevSeriesSelection] = useState(null);
  if (
    newFilterSelection.series ||
    !isEqual(prevSeriesSelection, selection.series)
  ) {
    setPrevSeriesSelection(selection.series);

    // if no series update was ordered, retain previous series selections
    if (!newFilterSelection.series)
      newFilterSelection.series = selection.series;

    // region checkboxes (disable if not valid, okay since list is limited in length)
    const newRegionSet = new Set(
      uiData.series.reduce(
        (acc, s) =>
          newFilterSelection.series[s.name] ? [...acc, ...s.regions] : acc,
        []
      )
    );
    newFilterSelection.region = getNewFilterSelection(
      selection.region,
      newRegionSet,
      "disabled"
    );

    // tier checkboxes (disable if not valid, okay since list is limited in length)
    const newTierSet = new Set(
      uiData.series.reduce(
        (acc, s) =>
          newFilterSelection.series[s.name] ? [...acc, ...s.tiers] : acc,
        []
      )
    );
    newFilterSelection.tier = getNewFilterSelection(
      selection.tier,
      newTierSet,
      "disabled"
    );

    // game checkboxes (hide if invalid, since list can be very long.)
    const newGameSet = new Set(
      uiData.series.reduce(
        (acc, s) =>
          newFilterSelection.series[s.name] ? [...acc, ...s.games] : acc,
        []
      )
    );
    newFilterSelection.game = getNewFilterSelection(
      selection.game,
      newGameSet,
      "hidden"
    );
    newFilterSelection.search = selection.search;

    setFilter(newFilterSelection);
  }

  return (
    <Container id="championships-page">
      <h2>Championships</h2>
      <Accordion>
        <Card>
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Filters
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <Row className="search-row">
                <Col>
                  <BSForm.Label>Search</BSForm.Label>
                  <BSForm.Control
                    type="text"
                    placeholder="Search"
                    onChange={handleChange.search}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <BSForm.Label>Series</BSForm.Label>
                  {Object.entries(selection.series).map(([key, value]) => (
                    <BSForm.Check
                      type="checkbox"
                      key={`checkbox-series-${key}`}
                      name={`${key}`}
                      label={`${key}`}
                      checked={value}
                      onChange={handleChange.series}
                    />
                  ))}
                </Col>
                <Col>
                  <BSForm.Label>Region</BSForm.Label>
                  {Object.entries(selection.region).map(([key, value]) => {
                    return value === "disabled" ? (
                      <BSForm.Check
                        disabled
                        type="checkbox"
                        key={`checkbox-region-${key}`}
                        label={`${key}`}
                        checked={false}
                      />
                    ) : (
                      <BSForm.Check
                        type="checkbox"
                        key={`checkbox-region-${key}`}
                        name={`${key}`}
                        label={`${key}`}
                        checked={value}
                        onChange={handleChange.region}
                      />
                    );
                  })}
                </Col>
                <Col>
                  <BSForm.Label>Tier</BSForm.Label>
                  {Object.entries(selection.tier).map(([key, value]) => {
                    return value === "disabled" ? (
                      <BSForm.Check
                        disabled
                        type="checkbox"
                        key={`checkbox-tier-${key}`}
                        label={`${key}`}
                        checked={false}
                      />
                    ) : (
                      <BSForm.Check
                        type="checkbox"
                        key={`checkbox-tier-${key}`}
                        name={`${key}`}
                        label={`${key}`}
                        checked={value}
                        onChange={handleChange.tier}
                      />
                    );
                  })}
                </Col>
                <Col>
                  <BSForm.Label>Game</BSForm.Label>
                  {Object.entries(selection.game)
                    .filter(([key, value]) => value !== "hidden")
                    .map(([key, value]) => (
                      <BSForm.Check
                        type="checkbox"
                        key={`checkbox-game-${key}`}
                        name={`${key}`}
                        label={`${key}`}
                        checked={value}
                        onChange={handleChange.game}
                      />
                    ))}
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Row>
        {s && thisSeries ? (
          <Can
            perform={["series:edit"]}
            on={{ seriesId: thisSeries._id }}
            yes={() => <NewItem to={`/${thisSeries.link}/championship/new`} />}
            no={() => null}
          />
        ) : null}
        {uiData.championships
          .filter(
            ({ name, abbreviation, series, region, tier, game }) =>
              selection.series[series.name] &&
              selection.region[region.name] &&
              selection.tier[tier.name] &&
              selection.game[game.name] &&
              (name.toLowerCase().includes(selection.search.toLowerCase()) ||
                abbreviation
                  .toLowerCase()
                  .includes(selection.search.toLowerCase()))
          )
          .map(({ _id, abbreviation, series, game, region, tier }, ind) => (
            <ChampionshipItem
              chId={_id}
              key={_id}
              abbreviation={abbreviation}
              seriesLink={series.link}
              game={game.name}
              region={region.name}
              tier={tier.name}
              colour={tier.colour}
            />
          ))}
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ ui: { uiData } }) => ({
  uiData,
});

export default connect(mapStateToProps)(ChampionshipsPage);
