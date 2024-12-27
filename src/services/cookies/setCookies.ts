import Cookies from "js-cookie";

const setCookies = (cookieName: string, data: string) => {
  Cookies.set(cookieName, data, {
    secure: true,
    sameSite: "strict",
    expires: (1 / 1440) * 60,
  });
};

export default setCookies;
