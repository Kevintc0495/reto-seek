import { redirect } from "react-router-dom";
import { getCookies } from "../services";
import { loginRoutes } from "@/routes";

const withoutAuthentication = () => {
  const token = getCookies("token");
  if (!token) return redirect(loginRoutes.signIn);
  else return null;
};

export default withoutAuthentication;
