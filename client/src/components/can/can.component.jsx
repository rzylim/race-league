// import React from "react";
import { connect } from "react-redux";

import checkPermissions from "../../authorisation/authorisation";

// on contains seriesId and/ or championshipId
// withPermissions contains seriesPermissions and/ or championshipPermissions
const Can = ({ uiData, currentUser, perform, on, yes, no }) => {
  if (!uiData || !currentUser) {
    return no();
  }

  return checkPermissions(
    uiData.roles,
    currentUser.role,
    perform, // array of permissions set for the component
    on,
    {
      seriesPermissions: currentUser.seriesPermissions,
      championshipPermissions: currentUser.championshipPermissions,
    }
  )
    ? yes()
    : no();
};

const mapStateToProps = ({ ui: { uiData }, user: { currentUser } }) => ({
  uiData,
  currentUser,
});

export default connect(mapStateToProps)(Can);
