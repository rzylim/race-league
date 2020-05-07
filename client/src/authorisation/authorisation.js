export const checkStatic = (staticPermissions, perform) =>
  perform.reduce((acc, p) => acc || staticPermissions.includes(p), false);

export const checkDynamic = (
  dynamicPermissions,
  perform,
  on,
  withPermissions
) =>
  perform.reduce((acc, p) => {
    const permissionCondition = dynamicPermissions[p];
    if (permissionCondition) {
      return acc || permissionCondition({ ...on, ...withPermissions });
    } else {
      return acc || false;
    }
  }, false);
