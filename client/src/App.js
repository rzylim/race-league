import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { checkUserSession } from "./redux/user/user.actions";
import { fetchUiData } from "./redux/ui/ui.actions";

import Container from "react-bootstrap/Container";

import Header from "./components/header/header.component";

import LandingPage from "./pages/landing/landing.component";
import DashboardPage from "./pages/dashboard/dashboard.component";
import NewEditItemPage from "./pages/new-edit-item/new-edit-item.component";
import ChampionshipsPage from "./pages/championships/championships.component";
import ChampionshipPage from "./pages/championship/championship.component";
import RoundPage from "./pages/round/round.component";
import DriversPage from "./pages/drivers/drivers.component";
import DriverPage from "./pages/driver/driver.component";

const App = ({ checkUserSession, fetchUiData, currentUser }) => {
  useEffect(() => {
    checkUserSession();
    fetchUiData();
  }, [checkUserSession, fetchUiData]);

  return (
    <>
      <Header />
      <Container>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route
            path="/dashboard/:itemType/:itemId"
            component={NewEditItemPage}
          />
          <Route path="/dashboard/:itemType" component={DashboardPage} />
          <Route path="/dashboard" component={DashboardPage} />

          <Route path="/:s/championships" component={ChampionshipsPage} />
          {/* creation and editing of championships */}
          {/* <Route
            path="/:itemType/:itemId/:subItemType/:subItemId/edit"
            component={NewEditItemPage}
          /> */}
          <Route
            path="/:parentItemType/:parentItemId/:itemType/:itemId/edit"
            component={NewEditItemPage}
          />
          <Route
            path="/:parentItemType/:parentItemId/:itemType/new"
            component={NewEditItemPage}
          />
          <Route
            path="/:parentItemType/:parentItemId/:itemType/:itemId"
            component={RoundPage}
          />
          <Route path="/:itemType/:itemId/edit" component={NewEditItemPage} />
          <Route path="/:itemType/new" component={NewEditItemPage} />

          <Route path="/championship/:chId" component={ChampionshipPage} />

          <Route path="/drivers" component={DriversPage} />
          <Route path="/driver/:dvrId" component={DriverPage} />
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
  fetchUiData: () => dispatch(fetchUiData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
