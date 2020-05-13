import axios from "axios";

import permissions from "../../authorisation/permissions";

export const getUiData = async () => {
  let { data } = await axios.get("/api/uidata");
  const compiledData = compileDataOnSeries(data.series, data.championships);
  data.series.forEach((s, idx) => {
    data.series[idx].regions = compiledData[s.name].seriesRegions;
    data.series[idx].tiers = compiledData[s.name].seriesTiers;
    data.series[idx].games = compiledData[s.name].seriesGames;
  });
  return {
    ...data,
    roles: assembleRoles(data.roles),
  };
};

// compile set of regions, tiers, and games for each seriesTiers
const compileDataOnSeries = (series, championships) =>
  series.reduce(
    (accS, s) => ({
      ...accS,
      [s.name]: championships.reduce(
        (accCh, ch) => {
          if (ch.series.name === s.name) {
            accCh.seriesRegions.add(ch.region.name);
            accCh.seriesTiers.add(ch.tier.name);
            accCh.seriesGames.add(ch.game.name);
          }
          return accCh;
        },
        {
          seriesRegions: new Set(),
          seriesTiers: new Set(),
          seriesGames: new Set(),
        }
      ),
    }),
    {}
  );

// construct role objects with functional dynamic_permissions
const assembleRoles = (roles) =>
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
