import $api from "@/service/http";
import { LoginType } from "@/types/Login";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.statusCode);
  console.log(req.method);
  // if (req.method == "GET") {
  const data = await login({
    email: "abas@gmail.com",
    password: "abasworm",
  });
  res.json(data);
  // }
}

async function login(loginData: LoginType) {
  try {
    const User = $api.post("/auth/login", loginData);
    console.log(User);
    return User;
  } catch (error) {
    console.log(error);
    return [];
  }
}

async function loginA(loginData: LoginType) {
  try {
    const res = await fetch("http://localhost:8000/auth/login", {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: loginData.email,
        password: loginData.password,
      }),
    });
    const js = await res.clone().json();
    console.log(js);
    if (res.status !== 200) {
      return js.message;
    }
    if (!js) throw new Error("Theres no field of hello world");
    return js;
  } catch (error: any) {
    console.log(error);
  }
}
