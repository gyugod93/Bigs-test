// app/api/auth/register/route.ts
import { RegisterType } from "@/app/lib/zod";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body: RegisterType = await request.json();

    const response = await fetch(
      "https://front-mission.bigs.or.kr/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json(
        { error: "회원가입 실패", details: errorData },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "회원가입 성공" });
  } catch (error) {
    console.error("회원가입 처리 중 오류:", error);
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
