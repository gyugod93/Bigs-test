"use client";
import { LoginSchema, LoginType } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });
  const router = useRouter();

  const handleLogin = async (data: LoginType) => {
    try {
      // 내부 API 라우트 호출
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("로그인 실패:", error);
        return;
      }

      const { accessToken, refreshToken } = await response.json();

      // 토큰 저장
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      console.log("로그인 성공");
      router.push("/");
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
    }
  };

  const goToRegisterPage = () => {
    router.push("/register");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h1 className="text-2xl font-bold text-center">로그인</h1>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-6">
          <div>
            <input
              {...form.register("username")}
              type="email"
              placeholder="이메일"
              className="w-full px-3 py-2 border rounded-md"
            />
            {form.formState.errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.username.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...form.register("password")}
              type="password"
              placeholder="비밀번호"
              className="w-full px-3 py-2 border rounded-md"
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              로그인
            </button>
            <button
              type="button"
              onClick={goToRegisterPage}
              className="w-full py-2 px-4 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
