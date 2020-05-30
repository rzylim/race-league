// module.exports used so that it can be used in Nodejs as well.
module.exports = {
  // across-the-board permissions
  static: [
    "series:view",
    // "series:create",
    "series:edit",
    // "series:delete",
    "championships:view",
    // "championships:create",
    "championships:edit",
    // "championships:delete",
    "users:list",
    "users:viewSelf",
    "users:permissions",
    "dashboard:view",
    "dashboard:edit",
  ],
  // specific permissions
  dynamic: {
    // create, edit, delete championships and races
    "series:edit": ({ seriesPermissions, seriesId }) => {
      if (!seriesPermissions || !seriesId) return false;

      return seriesPermissions.includes(seriesId);
    },
    // create, edit, delete races
    "championships:edit": ({
      seriesPermissions,
      seriesId,
      championshipPermissions,
      championshipId,
    }) => {
      if (!seriesPermissions || !seriesId) {
        if (!championshipPermissions || !championshipId) return false;
        // check if user has permission to edit the championship
        return championshipPermissions.includes(championshipId);
      } else {
        // check if user has permission to edit the series
        return seriesPermissions.includes(seriesId);
      }
    },
  },
};

// export default permissions;
