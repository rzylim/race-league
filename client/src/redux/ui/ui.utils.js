import axios from "axios";

import assembleRoles from "../../authorisation/roles";

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
