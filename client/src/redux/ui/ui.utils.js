import axios from "axios";

export const getSeries = async () => {
  const series = await axios.get("/api/series");
  return series.data;
};
