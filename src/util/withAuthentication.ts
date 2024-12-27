import { redirect } from "react-router-dom";
import { getCookies } from "../services";
import { homeRoutes } from "@/routes";

const withAuthentication = () => {
  const token = getCookies("token");
  if (token) return redirect(homeRoutes.home);
  else return null;
};

export default withAuthentication;
