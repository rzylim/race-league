import React from "react";
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";

import DiscordLogin from "../discord-signin/discord-signin.component";

import "./header.styles.scss";

const Header = ({ currentUser, series }) => (
  <Navbar bg="dark" variant="dark" fixed="sticky-top" expand="sm">
    <Navbar.Brand href="/">Race League</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        {series ? (
          series.map(({ name, link }) => (
            <NavDropdown title={name} key={name}>
              <NavDropdown.Item href={`/${link}/championship`}>
                Championship
              </NavDropdown.Item>
              <NavDropdown.Item href={`/${link}/tracks`}>
                Tracks
              </NavDropdown.Item>
            </NavDropdown>
          ))
        ) : (
          <div></div>
        )}
        <Nav.Link href="/test">Test</Nav.Link>
        <Nav.Link href="/test2">Test2</Nav.Link>
      </Nav>
      {currentUser ? (
        <NavDropdown
          title={`Signed in as ${currentUser.email}`}
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
