import Cookies from "js-cookie";

const removeCookies = (cookieName: string) => {
  Cookies.remove(cookieName);
};

export default removeCookies;
