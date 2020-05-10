// import React from "react";
import { connect } from "react-redux";

import { checkStatic, checkDynamic } from "../../authorisation/authorisation";

// on contains seriesId and/ or championshipId
// withPermissions contains seriesPermissions and/ or championshipPermissions
const Can = ({ uiData, currentUser, perform, on, yes, no }) => {
  if (!uiData || !currentUser) {
    return no();
  }

  return check(
    uiData.roles,
    currentUser.role,
    perform, // array of permissions set for the component
    on,
    {
      seriesPermissions: uiData.seriesPermissions,
      championshipPermissions: uiData.championshipPermissions,
    }
  )
    ? yes()
    : no();
};

const check = (roles, role, perform, on, withPermissions) => {
  const rolePermissions = roles[role];
  if (!rolePermissions) {
    // role is invalid
    return false;
  }

  const staticPermissions = rolePermissions.static_permissions;
  if (staticPermissions && checkStatic(staticPermissions, perform)) {
    // static rule not provided for action
    return true;
  }

  const dynamicPermissions = rolePermissions.dynamic_permissions;
  return (
    dynamicPermissions &&
    checkDynamic(dynamicPermissions, perform, on, withPermissions)
  );
};

const mapStateToProps = ({ ui: { uiData }, user: { currentUser } }) => ({
  uiData,
  currentUser,
});

export default connect(mapStateToProps)(Can);
