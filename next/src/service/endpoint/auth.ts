import { LoginType } from "@/types/Login";
import $api from "../http";
import { AuthResponse } from "@/types/AuthResponse";

export class AuthService {
  static async login(loginData: LoginType) {
    return $api.post<AuthResponse>("/api/login", loginData);
  }
}
