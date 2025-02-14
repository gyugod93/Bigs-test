import { RegisterSchema } from "@/app/lib/zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedData = RegisterSchema.safeParse(body);
    if (!parsedData.success) {
      return NextResponse.json(
        { message: parsedData.error.errors.map((e) => e.message).join(", ") },
        { status: 400 }
      );
    }

    const response = await fetch(
      "https://front-mission.bigs.or.kr/auth/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parsedData),
      }
    );

    const responseText = await response.text();
    let responseData;
    try {
      responseData = responseText ? JSON.parse(responseText) : null;
    } catch (e) {
      responseData = null;
    }

    if (!response.ok) {
      return NextResponse.json(
        { message: `회원가입 실패: ${responseText}` },
        { status: response.status }
      );
    }

    return NextResponse.json(
      { message: "회원가입 성공", user: responseData },
      { status: 200 }
    );
  } catch (error) {
    console.error("서버 측 오류 발생:", error);
    return NextResponse.json(
      { message: "알 수 없는 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
