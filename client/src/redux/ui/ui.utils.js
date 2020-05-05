import axios from "axios";

export const getSeries = async () => {
  console.log("in getSeries()");
  const series = await axios.get("/api/series");
  return series.data;
};
