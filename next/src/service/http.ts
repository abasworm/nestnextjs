import { AuthResponse } from "@/types/AuthResponse";
import fingerprint from "@/utils/fingerprint";
import axios from "axios";
import Cookie from "js-cookie";

export const API_URL =
  process.env.NODE_ENV == "development"
    ? "http://localhost:3000"
    : process.env.API_URL;

export const $api = axios.create({
  validateStatus: (status: number) => status == 200 || status == 201,
  withCredentials: true,
  baseURL: `${API_URL}`,
});

$api.interceptors.request.use(async (config) => {
  config.headers.Authorization = `Bearer ${Cookie.get("access-token")}`;
  config.headers.fingerprint = await fingerprint;
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    //console.log(error);
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      console.time("api interceptors");
      try {
        const response = await axios.get<AuthResponse>(
          `${API_URL}/api/auth/refresh-token`,
          {
            withCredentials: true,
            headers: {
              fingerprint: await fingerprint,
            },
          },
        );
        if (response.status !== 200) throw response;
        Cookie.remove("access-token");
        Cookie.set("access-token", response.data.accessToken);
        return $api.request(originalRequest);
      } catch (e: any) {
        console.table(e);
        Cookie.remove("access-token");
      } finally {
        console.timeEnd("api interceptors");
      }
    }
    throw error;
  },
);

export default $api;
