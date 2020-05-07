import axios from "axios";

import permissions from "../../authorisation/permissions";

export const getUiData = async () => {
  const uiData = await axios.get("/api/uidata");
  return {
    ...uiData.data,
    roles: assembleRoles(uiData.data.roles),
  };
};

// construct role objects with functional dynamic_permissions
const assembleRoles = (roles) => {
  return roles.reduce(
    (acc, { name, static_permissions, dynamic_permissions }) => {
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
    },
    {}
  );
};

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
