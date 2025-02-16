"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { LoginSchema, LoginType } from "@/app/utils/validations/schemas";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
  });

  const handleLogin = async (data: LoginType) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        setLoginError(
          result.message || "로그인에 실패했습니다. 다시 시도해주세요."
        );
        return;
      }

      const { accessToken, refreshToken } = result;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);

      router.push("/");
    } catch (error) {
      setLoginError("네트워크 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const goToRegisterPage = () => {
    router.push("/register");
  };

  return {
    form,
    handleLogin,
    goToRegisterPage,
    isLoading,
    loginError,
  };
};
