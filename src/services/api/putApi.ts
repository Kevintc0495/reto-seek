import { getCookies, api } from "@/services";

const putApi = async <T>(url: string, data?: T) => {
  const token = getCookies("token");
  const response = await api.put(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export default putApi;
