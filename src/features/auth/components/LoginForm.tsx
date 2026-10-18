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
import { z } from "zod"
import { authClient } from "@/lib/auth-client.ts"
import { toast } from "@/components/ui/toast.tsx"
import { useForm } from "@tanstack/react-form"
import type { ComponentProps } from "react"

const formSchema = z.object({
  email: z.email({
    error: (iss) =>
      iss.input === "" ? "请输入邮箱。" : "请输入正确的邮箱地址。",
  }),
  password: z.string().min(1, "请输入密码。").min(8, "密码长度至少8位。"),
})


export function LoginForm({ className, ...props }: ComponentProps<"div">) {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const loginPromise = async () => {
        const { error } = await authClient.signIn.email({
          email: value.email,
          password: value.password,
        })

        if (error) {
          throw error
        }

        await navigate({
          to: "/",
          replace: true,
        })

        return value.email
      }

      await toast.promise(loginPromise(), {
        loading: "登录中...",
        success: (email) => `欢迎回来，${email}！`,
        error: "邮箱或密码错误。",
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
            <h1 className="text-xl font-bold">欢迎</h1>
            <FieldDescription>
              还没有账户？<Link to="/sign-up">注册</Link>
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
          <form.Field name="password">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>密码</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="password"
                  placeholder="************"
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
            <FieldDescription>
              <Link to="/forgot-password">忘记密码了？</Link>
            </FieldDescription>
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting}>
                  登录
                </Button>
              )}
            </form.Subscribe>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
