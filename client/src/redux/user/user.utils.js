import axios from "axios";
import Cookies from "universal-cookie";

export const getCurrentUser = async () => {
  const res = await axios.get("/api/current_user");
  return res.data.user._doc;
};

export const signOutUser = () => {
  const cookies = new Cookies();
  cookies.remove("jwt");
};
