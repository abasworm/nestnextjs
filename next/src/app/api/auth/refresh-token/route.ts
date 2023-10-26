import { $initApi } from "@/service/http-init";
import { NextResponse as res } from "next/server";
import { cookies } from "next/headers";
import ms from "ms";

export async function GET(req: Request) {
  console.log(cookies().get("refresh-token"));
  try {
    const refreshToken = cookies().has("refresh-token")
      ? cookies().get("refresh-token")?.value
      : undefined;

    if (!refreshToken) return AuthError(`You dont have authorization. (101)`);

    const response = await $initApi.post(
      "/auth/refresh-token",
      JSON.stringify({ refreshToken }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    // console.log(response?.status);
    if (response?.status !== 201)
      return AuthError(`You dont have authorization. (102)`);
    if (cookies().has("access-token")) cookies().delete("access-token");
    const dateNow = new Date().getTime();
    const ttl = new Date(dateNow + ms(response.data.expiresIn)).getTime();
    cookies().set("access-token", response.data.accessToken, {
      expires: ttl,
    });
    return res.json(response.data);
  } catch (error: any) {
    console.log(error?.data?.message);
    return AuthError(`You dont have authorization. (103)`);
  }
}

function AuthError(message: string) {
  return new res(JSON.stringify({ message }), {
    status: 400,
  });
}
