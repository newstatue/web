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
import { authClient } from "@/lib/auth-client.ts"
import { toast } from "@/components/ui/toast.tsx"
import { useForm } from "@tanstack/react-form"
import type { ComponentProps } from "react"

const formSchema = z.object({
  email: z.email({
    error: (iss) => (
      iss.input === "" ?  "请输入邮箱。" : "请输入正确的邮箱地址。"
    ),
  }),
})

export function ForgotPasswordForm({ className, ...props }: ComponentProps<"div">) {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const forgotPasswordPromise = async () => {
          const { error } = await authClient.emailOtp.requestPasswordReset({
            email: value.email,
          })
          if (error) {
            throw error
          }

          await navigate({
            to: "/otp",
            search: {
              email: value.email,
              type: "forgot-password",
            },
          })

          return value.email
      }

      await toast.promise(forgotPasswordPromise(), {
        loading: "发送邮件中...",
        success: (email) => `邮件已发送到 ${email}。`,
        error: "发送邮件失败。",
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
            <h1 className="text-xl font-bold">忘记密码了？</h1>
            <FieldDescription>
              输入你的邮箱地址，我们将发送验证码帮助你重置密码。
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
                  继续
                </Button>
              )}
            </form.Subscribe>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
