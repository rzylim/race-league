import axios from "axios";

export const getCurrentUser = async () => {
  const user = await axios.get("/auth/current_user");
  return user.data;
};
