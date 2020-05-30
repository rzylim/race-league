// module.exports used so that it can be used in Nodejs as well.
module.exports = (roles, role, perform, on, withPermissions) => {
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

const checkStatic = (staticPermissions, perform) =>
  perform.reduce((acc, p) => acc || staticPermissions.includes(p), false);

const checkDynamic = (dynamicPermissions, perform, on, withPermissions) =>
  perform.reduce((acc, p) => {
    const permissionCondition = dynamicPermissions[p];
    if (permissionCondition) {
      return acc || permissionCondition({ ...on, ...withPermissions });
    } else {
      return acc || false;
    }
  }, false);
