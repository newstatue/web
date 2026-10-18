import { cn } from "cn"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Link, useNavigate } from "@tanstack/react-router"
import type { ComponentProps } from "react"
import { z } from "zod"
import { useForm } from "@tanstack/react-form"
import { authClient } from "@/lib/auth-client.ts"
import { toast } from "@/components/ui/toast.tsx"

const formSchema = z
  .object({
    email: z.email({
      error: (iss) =>
        iss.input === "" ? "请输入邮箱。" : "请输入正确的邮箱地址。",
    }),
    password: z.string().min(1, "请输入密码。").min(8, "密码长度至少8位。"),
    confirmPassword: z.string().min(1, "请确认您的密码。"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不匹配。",
    path: ["confirmPassword"],
  })

export function SignupForm({ className, ...props }: ComponentProps<"div">) {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const signupPromise = async () => {
        const seed = crypto.randomUUID()

        const { error } = await authClient.signUp.email({
          name: value.email.split("@")[0],
          email: value.email,
          password: value.password,
          image: `https://api.dicebear.com/10.x/waves/svg?seed=${seed}`,
        })

        if (error) {
          throw new Error(error.message || "创建账户失败")
        }

        const { error: otpError } =
          await authClient.emailOtp.sendVerificationOtp({
            email: value.email,
            type: "email-verification",
          })

        if (otpError) {
          toast.add({
            title: "验证码发送失败",
            description: "账户已创建，请重新发送验证码。",
            type: "error",
          })
        }

        await navigate({
          to: "/otp",
          search: {
            email: value.email,
            type: "signup",
          },
        })

        return value.email
      }

      await toast.promise(signupPromise(), {
        loading: "创建账户中...",
        success: (email) => `请验证邮箱：${email}`,
        error: "创建账户失败，请稍后重试。",
      })
    },
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form>
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-bold">欢迎</h1>
            <FieldDescription>
              已经有账户了？ <Link to="/login">登录</Link>
            </FieldDescription>
          </div>
          <form.Field name="email">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>邮箱</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="m@example.com"
                  autoComplete="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>密码</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="*************"
                  autoComplete="new-password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <form.Field name="confirmPassword">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>确认密码</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="*************"
                  autoComplete="new-password"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={field.state.meta.errors.length > 0}
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <Field>
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting}>
                  创建账户
                </Button>
              )}
            </form.Subscribe>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
