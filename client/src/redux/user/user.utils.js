import axios from "axios";

export const getCurrentUser = async () => {
  const user = await axios.get("/api/current_user");
  return user.data;
};
