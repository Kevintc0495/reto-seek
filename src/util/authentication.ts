import { redirect } from "react-router-dom";
import { getCookies } from "../services";
import { loginRoutes, homeRoutes } from "@/routes";
import { getStorageParse } from "./storage";
import { IPayloadToken } from "@/interface";

const hasToken = (isProtected: boolean) => {
  const token = getCookies("token");
  const user: IPayloadToken = getStorageParse('user');

  if (isProtected && !token) return redirect(loginRoutes.signIn);
  else if (!isProtected && token) return redirect(homeRoutes.home);
  return user ? { isAdmin: user.isAdmin } : null;
};

const authenticationRouter = (isProtected = true) => {
  return hasToken(isProtected);
};

export default authenticationRouter;
