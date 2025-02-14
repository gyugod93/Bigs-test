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

// "use client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// const RegisterPage = () => {
//   const [username, setUsername] = useState("");
//   const [name, setName] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");
//   const [successMessage, setSuccessMessage] = useState("");

//   const route = useRouter();
//   const validatePassword = (password: string) => {
//     const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!%*#?&])[A-Za-z\d!%*#?&]{8,}$/;
//     return regex.test(password);
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();

//     // Check if username is a valid email
//     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     if (!emailRegex.test(username)) {
//       setErrorMessage("이메일 형식이 올바르지 않습니다.");
//       return;
//     }

//     // Check if password meets the criteria
//     if (!validatePassword(password)) {
//       setErrorMessage(
//         "비밀번호는 8자 이상, 숫자, 영문자, 특수문자(!%*#?&)가 1개 이상 포함되어야 합니다."
//       );
//       return;
//     }

//     // Check if password and confirm password match
//     if (password !== confirmPassword) {
//       setErrorMessage("비밀번호와 확인 비밀번호가 일치하지 않습니다.");
//       return;
//     }

//     const data = {
//       username,
//       name,
//       password,
//     };

//     try {
//       const response = await fetch(
//         "https://front-mission.bigs.or.kr/auth/signup",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(data),
//         }
//       );

//       const responseText = await response.text();

//       if (!response.ok) {
//         setErrorMessage(responseText || "회원가입 실패");
//         return;
//       }

//       // 서버에서 JSON 형식이 아니라면 오류가 발생할 수 있기 때문에 안전하게 JSON으로 파싱
//       let result;
//       try {
//         result = JSON.parse(responseText); // 텍스트를 JSON으로 파싱
//       } catch (error) {
//         console.error("응답 JSON 파싱 오류:", error);
//         setErrorMessage("서버 응답이 올바르지 않습니다.");
//         return;
//       }

//       console.log("회원가입 성공:", result);
//       setSuccessMessage("회원가입 성공! 로그인 해주세요.");
//       // 성공적으로 회원가입되면 다른 페이지로 리디렉션하거나 상태 변경
//     } catch (error) {
//       setErrorMessage("알 수 없는 오류가 발생했습니다.");
//       console.error("알 수 없는 오류:", error);
//     }
//   };

//   return (
//     <div>
//       <h1>회원가입</h1>
//       <form onSubmit={handleSignup}>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="이메일"
//           required
//         />
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           placeholder="사용자 이름"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="비밀번호"
//           required
//         />
//         <input
//           type="password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           placeholder="비밀번호 확인"
//           required
//         />
//         <button type="submit">가입</button>
//       </form>
//       {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
//       {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
//     </div>
//   );
// };

// export default RegisterPage;
