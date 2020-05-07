import React from "react";
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

import Can from "../can/can.component";

import DiscordLogin from "../discord-signin/discord-signin.component";

import "./header.styles.scss";

const Header = ({ currentUser, series }) => (
  <Navbar bg="dark" variant="dark" fixed="sticky-top" expand="sm">
    <Navbar.Brand as={Link} to="/">
      Race League
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        {series
          ? series.map(({ name, link }) => (
              <NavDropdown title={name} key={link}>
                <NavDropdown.Item as={Link} to={`/${link}/championship`}>
                  Championship
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={`/${link}/tracks`}>
                  Tracks
                </NavDropdown.Item>
              </NavDropdown>
            ))
          : null}
        <Can
          perform={["dashboard:view"]}
          yes={() => (
            <Nav.Link as={Link} to="/dashboard">
              Dashboard
            </Nav.Link>
          )}
          no={() => null}
        />
        <Nav.Link as={Link} to="/test">
          Test
        </Nav.Link>
      </Nav>
      {currentUser._id ? (
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
  </Navbar>
);

const mapStateToProps = ({ user: { currentUser }, ui: { series } }) => ({
  currentUser,
  series,
});

export default connect(mapStateToProps)(Header);
