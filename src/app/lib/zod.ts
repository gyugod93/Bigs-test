import { z } from "zod";

const emailSchema = z.string().email("유효한 이메일 주소를 입력하세요");
const passwordSchema = z
  .string()
  .min(8, "비밀번호는 최소 8자 이상이어야 합니다")
  .regex(/[A-Za-z]/, "비밀번호에 최소 하나의 영문자가 포함되어야 합니다")
  .regex(/[0-9]/, "비밀번호에 최소 하나의 숫자가 포함되어야 합니다")
  .regex(/[\W_]/, "비밀번호에 최소 하나의 특수문자가 포함되어야 합니다");

export const RegisterSchema = z
  .object({
    username: emailSchema,
    name: z.string().min(1, "이름을 입력해주세요"),
    password: passwordSchema,
    confirmPassword: passwordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  username: emailSchema,
  password: passwordSchema,
});

export const PostSchema = z.object({
  title: z.string().min(1, "제목을 입력하세요"),
  content: z.string().min(1, "내용을 입력하세요"),
  category: z.string().min(1, "카테고리를 선택하세요"),
});

export type RegisterType = z.infer<typeof RegisterSchema>;
export type LoginType = z.infer<typeof LoginSchema>;
export type PostType = z.infer<typeof PostSchema>;
