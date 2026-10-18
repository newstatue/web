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
import { useNavigate } from "@tanstack/react-router"
import { z } from "zod"
import { authClient } from "@/lib/auth-client"
import { toast } from "@/components/ui/toast"
import { useForm } from "@tanstack/react-form"
import type { ComponentProps } from "react"

const formSchema = z
  .object({
    password: z.string().min(1, "请输入新密码。").min(8, "密码长度至少8位。"),
    confirmPassword: z.string().min(1, "请再次输入新密码。"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致。",
    path: ["confirmPassword"],
  })

interface ResetPasswordFormProps extends ComponentProps<"div"> {
  email: string
  otp: string
}

export function ResetPasswordForm({
  email,
  otp,
  className,
  ...props
}: ResetPasswordFormProps) {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const resetPasswordPromise = async () => {
        const { error } = await authClient.emailOtp.resetPassword({
          email,
          otp,
          password: value.password,
        })

        if (error) {
          throw error
        }

        await navigate({
          to: "/login",
          replace: true,
        })

        return true
      }

      await toast.promise(resetPasswordPromise(), {
        loading: "重置密码中...",
        success: "密码重置成功，请重新登录。",
        error: "密码重置失败，验证码可能已过期。",
      })
    },
  })

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          e.stopPropagation()
          void form.handleSubmit()
        }}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-xl font-bold">重置密码</h1>
            <FieldDescription>请设置一个新的密码。</FieldDescription>
          </div>

          <form.Field name="password">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>新密码</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="至少8位密码"
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
                <FieldLabel htmlFor={field.name}>确认新密码</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="再次输入新密码"
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
                  重置密码
                </Button>
              )}
            </form.Subscribe>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
