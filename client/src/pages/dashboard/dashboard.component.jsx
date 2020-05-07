import React from "react";
import { Redirect } from "react-router-dom";

import Can from "../../components/can/can.component";

const DashboardPage = () => (
  <Can
    perform={["dashboard:view"]}
    yes={() => <h2>Dashboard</h2>}
    no={() => <Redirect to="/" />}
  />
);

export default DashboardPage;
