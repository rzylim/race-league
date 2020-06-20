import axios from "axios";

import assembleRoles from "../../authorisation/roles";

export const getUiData = async () => {
  let { data } = await axios.get("/api/ui_data");
  const objectifiedData = Object.entries(data).reduce(
    objectArraysToObjectsReducer,
    {}
  );
  objectifiedData.roles = assembleRoles(data.roles);
  objectifiedData.series = compileDataOnSeries(data.series, data.championships);
  return objectifiedData;
};

// compile set of regions, tiers, and games for each seriesTiers
const compileDataOnSeries = (series, championships) =>
  series.reduce(
    (accS, s) => ({
      ...accS,
      [s._id]: championships.reduce(
        (accCh, ch) => {
          if (ch.series.name === s.name) {
            accCh.regions.add(ch.region.name);
            accCh.tiers.add(ch.tier.name);
            accCh.games.add(ch.game.name);
          }
          return accCh;
        },
        {
          ...s,
          regions: new Set(),
          tiers: new Set(),
          games: new Set(),
        }
      ),
    }),
    {}
  );

const objectArraysToObjectsReducer = (acc, [key, value]) =>
  Array.isArray(value)
    ? {
        ...acc,
        [key]: Object.entries(value.reduce(arrayToObjectReducer, {})).reduce(
          objectArraysToObjectsReducer,
          {}
        ),
      }
    : typeof value === "object" && value !== null
    ? {
        ...acc,
        [key]: Object.entries(value).reduce(objectArraysToObjectsReducer, {}),
      }
    : {
        ...acc,
        [key]: value,
      };

const arrayToObjectReducer = (acc, value) => {
  const { _id, ...otherProps } = value;
  return typeof value === "object" && value !== null
    ? {
        ...acc,
        [_id]: { _id, ...otherProps },
      }
    : {
        ...acc,
        [value]: {},
      };
};
