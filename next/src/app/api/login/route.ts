import { LoginType } from "@/types/Login";
import { AxiosResponse } from "axios";
import { NextResponse as res } from "next/server";
import { $initApi } from "@/service/http-init";
import { cookies } from "next/headers";
import ms from "ms";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.clone().json();

    const data: AxiosResponse | undefined = await login({
      // email: "abas@gmail.com",
      // password: "abasworm",
      email: email,
      password: password,
    });
    if (data?.status) {
      if ([200, 201].includes(data.status)) {
        const dateNow = new Date().getTime();
        const ttl = new Date(dateNow + ms(data.data.expiresIn)).getTime();
        const ttlRefresh = new Date(dateNow + ms("1d")).getTime();

        if (cookies().has("access-token")) cookies().delete("access-token");
        if (cookies().has("refresh-token")) cookies().delete("refresh-token");
        cookies().set("access-token", data.data.accessToken, {
          expires: ttl,
        });
        cookies().set("refresh-token", data.data.refreshToken, {
          sameSite: true,
          httpOnly: true,
          expires: ttlRefresh,
          // secure: true,
        });
        // console.log(data.data.refreshToken);
        return res.json(data.data);
      }
    }
    throw new Error("Password or Email is Not registered. 04");
  } catch (error: any) {
    console.log(error?.data?.message);
    return new res(JSON.stringify({ message: error.message }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

async function login(loginData: LoginType) {
  try {
    const User: AxiosResponse = await $initApi.post(
      "/auth/login",
      JSON.stringify(loginData),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return User;
  } catch (error: any) {
    console.log(error?.data?.message);
    return undefined;
  }
}
