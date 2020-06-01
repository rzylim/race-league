import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { checkUserSession } from "./redux/user/user.actions";
import { loadUiData } from "./redux/ui/ui.actions";

import Container from "react-bootstrap/Container";

import Header from "./components/header/header.component";

import LandingPage from "./pages/landing/landing.component";
import DashboardPage from "./pages/dashboard/dashboard.component";
import ChampionshipsPage from "./pages/championships/championships.component";
import ChampionshipPage from "./pages/championship/championship.component";
import NewChampionshipPage from "./pages/new-championship/new-championship.component";
import NewItemPage from "./pages/new-item/new-item.component";

const App = ({ checkUserSession, loadUiData, currentUser }) => {
  useEffect(() => {
    checkUserSession();
    loadUiData();
  }, [checkUserSession, loadUiData]);

  return (
    <div>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/dashboard" component={DashboardPage} />
          <Route path="/dashboard/:item/new" component={NewItemPage} />
          <Route path="/:s/championships/new" component={NewChampionshipPage} />
          <Route path="/:s/championships/:c" component={ChampionshipPage} />
          <Route path="/:s/championships" component={ChampionshipsPage} />
          {/* admin role, test role (that can only create but not delete seasons) */}
        </Switch>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserSession: () => dispatch(checkUserSession()),
  loadUiData: () => dispatch(loadUiData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
