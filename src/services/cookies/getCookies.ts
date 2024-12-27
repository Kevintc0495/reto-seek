import Cookies from "js-cookie";

const getCookies = (cookieName: string) => {
  return Cookies.get(cookieName);
};

export default getCookies;
