import { AxiosRequestConfig } from "axios";
import { getCookies, api } from "@/services";

const getApi = async (url: string, config?: AxiosRequestConfig) => {
  const token = getCookies("token");
  const response = await api.get(url, {
    ...config,
    headers: {
      ...config?.headers,
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export default getApi;
