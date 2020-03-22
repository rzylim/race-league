import React from "react";
import { connect } from "react-redux";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";

import DiscordSignin from "../discord-signin/discord-signin.component";

import { signOutStart } from "../../redux/user/user.actions";

const Header = ({ currentUser, signOutStart }) => (
  <Navbar bg="dark" variant="dark" fixed="sticky-top" expand="sm">
    <Navbar.Brand href="/">Race League</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link href="/test">Test</Nav.Link>
        <Nav.Link href="/test2">Test2</Nav.Link>
      </Nav>
      {currentUser ? (
        <Button onClick={signOutStart} variant="outline-danger">
          Sign out
        </Button>
      ) : (
        <Nav.Link href="/auth/discord">
          <DiscordSignin />
        </Nav.Link>
      )}
    </Navbar.Collapse>
  </Navbar>
);

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
