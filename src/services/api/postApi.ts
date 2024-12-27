import { getCookies, api } from "@/services";

const postApi = async <T>(url: string, data?: T) => {
  const token = getCookies("token");
  const response = await api.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response;
};

export default postApi;
