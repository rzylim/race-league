import React from "react";
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import DiscordLogin from "../discord-signin/discord-signin.component";

const Header = ({ currentUser }) => (
  <Navbar bg="dark" variant="dark" fixed="sticky-top" expand="sm">
    <Navbar.Brand href="/">Race League</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/test">Test</Nav.Link>
        <Nav.Link href="/test2">Test2</Nav.Link>
      </Nav>
      {currentUser ? (
        <Button href="/api/logout" variant="outline-danger">
          Sign out
        </Button>
      ) : (
        <Nav.Link href="/auth/discord">
          <DiscordLogin />
        </Nav.Link>
      )}
    </Navbar.Collapse>
  </Navbar>
);

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default connect(mapStateToProps)(Header);
