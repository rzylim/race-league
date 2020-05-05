import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import { checkUserSession } from "./redux/user/user.actions";
import { loadUiData } from "./redux/ui/ui.actions";

import Header from "./components/header/header.component";
const Landing = () => <h2>Landing</h2>;

const App = ({ checkUserSession, loadUiData, currentUser }) => {
  useEffect(() => {
    checkUserSession();
    loadUiData();
  }, [checkUserSession, loadUiData]);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path="/" component={Landing} />
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
