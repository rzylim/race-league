import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Container,
  Accordion,
  Card,
  Row,
  Col,
  Form as BSForm,
} from "react-bootstrap";

import DriverItem from "../../components/driver-item/driver-item.component";

import { searchStringProps } from "../../utilities/search";

import "./drivers.styles.scss";

const DriversPage = ({ uiData }) => {
  const [search, setSearch] = useState("");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // wait for ui data to load.
  if (!uiData) return null;

  return (
    <Container id="drivers-page">
      <h2>Drivers</h2>
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
                    onChange={handleSearchChange}
                  />
                </Col>
              </Row>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
      <Row>
        {uiData.users
          .filter(({ username }) => searchStringProps({ username }, search))
          .map(({ _id, username }) => (
            <DriverItem
              dvrId={_id}
              key={_id}
              username={username}
              to={`/driver/${_id}`}
            />
          ))}
      </Row>
    </Container>
  );
};

const mapStateToProps = ({ ui: { uiData } }) => ({
  uiData,
});

export default connect(mapStateToProps)(DriversPage);
