// import React from "react";
import { connect } from "react-redux";

import { checkStatic, checkDynamic } from "../../authorisation/authorisation";

// on contains seriesId and/ or championshipId
// withPermissions contains seriesPermissions and/ or championshipPermissions
const Can = ({ roles, role, perform, on, withPermissions, yes, no }) =>
  check(
    roles,
    role,
    perform, // array of permissions set for the component
    on,
    withPermissions
  )
    ? yes()
    : no();

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

const mapStateToProps = ({
  ui: { roles },
  user: {
    currentUser: { role, seriesPermissions, championshipPermissions },
  },
}) => ({
  roles,
  role: role,
  withPermissions: { seriesPermissions, championshipPermissions },
});

export default connect(mapStateToProps)(Can);
