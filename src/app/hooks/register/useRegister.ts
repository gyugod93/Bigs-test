"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { RegisterSchema, RegisterType } from "@/app/utils/validations/schemas";

export const useRegister = () => {
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const form = useForm<RegisterType>({
    resolver: zodResolver(RegisterSchema),
    mode: "onChange",
  });

  const formatErrorMessage = (errorResponse: unknown): string => {
    try {
      // 문자열로 온 경우 바로 반환
      if (typeof errorResponse === "string") return errorResponse;

      // JSON 문자열로 온 경우 파싱
      const errorObject =
        typeof errorResponse === "string"
          ? JSON.parse(errorResponse)
          : errorResponse;

      // username 관련 에러 처리
      if (errorObject.username) {
        const usernameError = Array.isArray(errorObject.username)
          ? errorObject.username[0]
          : errorObject.username;

        if (usernameError.includes("이미 사용중인 아이디")) {
          return "이미 등록된 이메일 주소입니다.";
        }
      }

      // 기타 에러 메시지 처리
      return "회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.";
    } catch {
      return "회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.";
    }
  };

  const handleSignup = async (data: RegisterType) => {
    setIsLoading(true);
    setError("");
    setIsSuccess(false);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setError(formatErrorMessage(result));
        return;
      }

      setIsSuccess(true);
      // 성공 메시지를 보여주기 위해 약간의 딜레이 후 리다이렉트
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      setError("서버와의 통신 중 오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  const goToLoginPage = () => {
    router.push("/login");
  };

  return {
    form,
    handleSignup,
    goToLoginPage,
    error,
    isLoading,
    isSuccess,
  };
};
