import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { checkUserSession } from "./redux/user/user.actions";
import { loadUiData } from "./redux/ui/ui.actions";

import Header from "./components/header/header.component";
import LandingPage from "./pages/landing/landing.component";
import DashboardPage from "./pages/dashboard/dashboard.component";
import TestPage from "./pages/test/test.component";

const App = ({ checkUserSession, loadUiData, currentUser }) => {
  useEffect(() => {
    checkUserSession();
    loadUiData();
  }, [checkUserSession, loadUiData]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/test" component={TestPage} />
        {/* admin role, test role (that can only create but not delete seasons) */}
      </Switch>
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
