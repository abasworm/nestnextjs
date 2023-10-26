import { NextRequest, NextResponse as res } from "next/server";
import { cookies } from "next/headers";
import { $initApi } from "@/service/http-init";
import qs from "querystring";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
  } catch (error) {}
}

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams;
    const page = params.get("page");
    const rowsPerPage = params.get("rowsPerPage");
    const search = params.get("search");

    const accessToken = req.headers.get("Authorization")?.split(" ")[1];
    // console.log(req.headers.get("Authorization")?.split(" ")[1]);
    const toSend = qs.encode({
      order: "ASC",
      page,
      take: rowsPerPage,
      search,
    });
    const result = await $initApi.get(`/user?${toSend}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(req?.headers);
    return res.json(result.data);
  } catch (error: any) {
    // console.info(error?.response);
    return new res(JSON.stringify({ message: error.message }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
