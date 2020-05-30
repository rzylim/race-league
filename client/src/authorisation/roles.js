// module.exports used so that it can be used in Nodejs as well.
const permissions = require("./permissions");

// construct role objects with functional dynamic_permissions
module.exports = (roles) =>
  roles.reduce((acc, { name, static_permissions, dynamic_permissions }) => {
    // convert dynamic_permissions array to object
    const functional_dynamic_permissions = dynamic_permissions.reduce(
      dynamicPermissionsReducer,
      {}
    );
    return {
      ...acc,
      [name]: {
        static_permissions,
        dynamic_permissions: functional_dynamic_permissions,
      },
    };
  }, {});

const dynamicPermissionsReducer = (acc, p) => {
  const permissionChecker = permissions.dynamic[p];
  // filter invalid dynamic permissions
  return permissionChecker
    ? {
        ...acc,
        [p]: permissionChecker,
      }
    : acc;
};
