import { NextRequest, NextResponse } from "next/server";
import { isAxiosError } from "axios";
import { api } from "../../api";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiRes = await api.post("/auth/register", body);

    const response = NextResponse.json(apiRes.data, { status: apiRes.status });

    const setCookieHeader = apiRes.headers["set-cookie"];
    if (setCookieHeader) {
      if (Array.isArray(setCookieHeader)) {
        setCookieHeader.forEach((cookieStr) => {
          response.headers.append("Set-Cookie", cookieStr);
        });
      } else {
        response.headers.set("Set-Cookie", setCookieHeader);
      }
    }

    return response;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      return NextResponse.json(
        {
          message:
            error.response?.data?.message ??
            "Не вдалося зареєструватися. Спробуйте ще раз",
        },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { message: "Помилка сервера. Спробуйте пізніше" },
      { status: 500 }
    );
  }
}