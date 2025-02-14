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
  const route = useRouter();

  const handleLogin = async (data: LoginType) => {
    try {
      const response = await fetch(
        "https://front-mission.bigs.or.kr/auth/signin",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      console.log("loginResponse:", response);
      console.log("loginData:", data);

      if (!response.ok) {
        console.error("로그인 실패:", response.status);
        return;
      }

      console.log("로그인 성공");
      route.push("/home");
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
    }
  };

  const goToRegisterPage = () => {
    route.push("/register");
  };

  return (
    <div>
      <h1>로그인 페이지</h1>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <input
          {...form.register("username")}
          type="email"
          placeholder="이메일"
        />
        {form.formState.errors.username && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.username.message}
          </p>
        )}
        <input
          {...form.register("password")}
          type="password"
          placeholder="비밀번호"
        />
        {form.formState.errors.password && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.password.message}
          </p>
        )}
        <button type="submit">가입</button>
        <button onClick={goToRegisterPage}>회원가입</button>
      </form>
    </div>
  );
};

export default LoginPage;
