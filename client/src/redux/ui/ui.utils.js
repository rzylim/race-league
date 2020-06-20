import axios from "axios";

import assembleRoles from "../../authorisation/roles";

import { objectArraysToObjectsReducer } from "../../utilities/objectArraysToObjects";

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
