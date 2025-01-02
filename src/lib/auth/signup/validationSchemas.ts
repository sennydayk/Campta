import { z } from "zod";

export const emailSchema = z.string().email("올바른 이메일 형식이 아닙니다.");

export const passwordSchema = z
  .string()
  .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "비밀번호에는 최소 1개의 특수문자가 포함되어야 합니다."
  );

export const signupSchema = z.object({
  name: z.string().min(1, "이름을 입력해주세요."),
  email: emailSchema,
  password: passwordSchema,
  nickname: z.string().min(1, "닉네임을 입력해주세요."),
  birthdate: z.string().min(1, "생년월일을 입력해주세요."),
  profileImg: z.string().nullable(),
});

export type SignupFormData = z.infer<typeof signupSchema>;
