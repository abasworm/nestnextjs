import axios from "axios";
import { cookies } from "next/headers";

export const API_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:8000"
    : process.env.API_URL;

export const $initApi = axios.create({
  validateStatus: (status: number) => status == 200 || status == 201,
  withCredentials: true,
  baseURL: `${API_URL}`,
});

$initApi.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${
    cookies().get("access-token")?.value
  }`;
  return config;
});

$initApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    console.log(error?.data?.message);
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest.isRetry = true;
      console.log("api interceptors init");
      try {
        const response = await axios.post(
          `${API_URL}/auth/refresh-token`,
          JSON.stringify({
            refreshToken: cookies().get("refresh-token")?.value,
          }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          },
        );
        if (response.status !== 201) throw response;
        cookies().delete("access-token");
        cookies().set("access-token", response.data.accessToken);
        return $initApi.request(originalRequest);
      } catch (error) {
        cookies().delete("access-token");
        console.error(error);
      } finally {
      }
    }
    throw error;
  },
);

export default $initApi;
