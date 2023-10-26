import { IUser } from "./IUser";

export interface AuthResponse {
  message?: string;
  accessToken: string;
  email: string;
  fullname: string;
  expires: string;
  refreshToken?: string;
}
