import { LoginType } from "@/app/utils/validations/schemas";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: LoginType = await request.json();

    const response = await fetch(
      "https://front-mission.bigs.or.kr/auth/signin",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: "로그인 실패", details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
