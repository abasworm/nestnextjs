import { AuthService } from "@/service/endpoint/auth";
import { IUser } from "@/types/IUser";
import { LoginType } from "@/types/Login";
import { AxiosResponse } from "axios";
import { makeAutoObservable } from "mobx";
import Cookies from "js-cookie";
import $api from "@/service/http";
export class GlobalStore {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;
  accessToken = "";

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  setLoading(bool: boolean) {
    this.isLoading = bool;
  }

  async login(loginData: LoginType) {
    try {
      const response = await AuthService.login(loginData);
      console.log({ response });
      if (response.status != 200) throw new Error(response.data.message);
      this.setAccessToken(response.data.accessToken);
      this.setAuth(true);
      this.setUser({
        email: response.data.email,
        fullname: response.data.fullname,
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await $api("/api/auth/refresh-token", {
        withCredentials: true,
      });
      Cookies.remove("access-token");
      Cookies.set("access-token", response.data.accessToken);
      this.setAuth(true);
      this.setUser({
        email: response.data.email,
        fullname: response.data.fullname,
      });
      return this.isAuth;
    } catch (error: any) {
      console.log(error.response?.data?.message);
      return false;
    } finally {
      this.setLoading(false);
    }
  }
}
