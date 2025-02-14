"use client";
import { RegisterSchema, RegisterType } from "@/app/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const RegisterPage = () => {
  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });
  const route = useRouter();

  const handleSignup = async (data: RegisterType) => {
    try {
      const response = await fetch(
        "https://front-mission.bigs.or.kr/auth/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      console.log("response:", response);
      console.log("data:", data);

      if (!response.ok) {
        console.error("회원가입 실패:", response.status);
        return;
      }

      console.log("회원가입 성공");
      route.push("/login");
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <h1>회원가입 페이지</h1>
      <form onSubmit={form.handleSubmit(handleSignup)}>
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
        <input {...form.register("name")} type="name" placeholder="이름" />
        {form.formState.errors.name && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.name.message}
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
        <input
          {...form.register("confirmPassword")}
          type="password"
          placeholder="비밀번호 확인"
        />
        {form.formState.errors.confirmPassword && (
          <p className="text-red-500 text-sm">
            {form.formState.errors.confirmPassword.message}
          </p>
        )}
        <button type="submit">가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;
