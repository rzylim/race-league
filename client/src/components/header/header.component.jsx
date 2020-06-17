import React from "react";
import { connect } from "react-redux";

import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

import Can from "../can/can.component";

import DiscordLogin from "../discord-signin/discord-signin.component";

import "./header.styles.scss";

const Header = ({ currentUser, uiData }) => (
  <Navbar bg="dark" variant="dark" fixed="sticky-top" expand="md">
    <Container>
      <Navbar.Brand as={Link} to="/">
        RaceLeague
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {uiData
            ? Object.values(uiData.series).map(({ name, link }) => (
                <NavDropdown title={name} key={link}>
                  <NavDropdown.Item as={Link} to={`/${link}/championships`}>
                    Championships
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to={`/${link}/tracks`}>
                    Tracks
                  </NavDropdown.Item>
                </NavDropdown>
              ))
            : null}
          <Nav.Link as={Link} to="/drivers">
            Drivers
          </Nav.Link>
          <Can
            perform={["dashboard:view"]}
            yes={() => (
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}
            no={() => null}
          />
        </Nav>
        {currentUser ? (
          <NavDropdown
            title={`Signed in as: ${currentUser.username}`}
            key="profile-drop"
            id="profile-drop"
          >
            <NavDropdown.Item href="/auth/signout" id="signout">
              Sign out
            </NavDropdown.Item>
          </NavDropdown>
        ) : (
          <Nav.Link href="/auth/discord">
            <DiscordLogin />
          </Nav.Link>
        )}
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

const mapStateToProps = ({ user: { currentUser }, ui: { uiData } }) => ({
  currentUser,
  uiData,
});

export default connect(mapStateToProps)(Header);
