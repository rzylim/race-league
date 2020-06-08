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
import NewEditChampionshipPage from "./pages/new-edit-championship/new-edit-championship.component";
import NewEditItemPage from "./pages/new-edit-item/new-edit-item.component";

const App = ({ checkUserSession, loadUiData, currentUser }) => {
  useEffect(() => {
    checkUserSession();
    loadUiData();
  }, [checkUserSession, loadUiData]);

  return (
    <>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={LandingPage} />{" "}
          <Route
            path="/dashboard/:itemType/:itemId"
            component={NewEditItemPage}
          />
          <Route path="/dashboard/:itemType" component={DashboardPage} />
          <Route path="/dashboard" component={DashboardPage} />
          <Route path="/:s/championships" component={ChampionshipsPage} />
          <Route
            path="/:s/championship/new"
            component={NewEditChampionshipPage}
          />
          <Route path="/:s/championships/:chId" component={ChampionshipPage} />
          <Route
            path="/:s/championships/:chId/edit"
            component={NewEditChampionshipPage}
          />
          {/* admin role, test role (that can only create but not delete seasons) */}
        </Switch>
      </Container>
    </>
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
