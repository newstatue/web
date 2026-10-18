import { cn } from "cn"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useNavigate } from "@tanstack/react-router"
import { useForm } from "@tanstack/react-form"
import { z } from "zod"
import type { ComponentProps } from "react"
import { authClient } from "@/lib/auth-client"
import { toast } from "@/components/ui/toast"
import { REGEXP_ONLY_DIGITS } from "input-otp"

const formSchema = z.object({
  otp: z.string().regex(/^\d{6}$/, "请输入六位数字验证码。"),
})

interface OtpFormProps extends ComponentProps<"div"> {
  email: string
  type: "signup" | "forgot-password"
}

export function OtpForm({ email, type, className, ...props }: OtpFormProps) {
  const navigate = useNavigate()

  const form = useForm({
    defaultValues: {
      otp: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const otpPromise = async () => {
        if (type === "signup") {
          const { error } = await authClient.emailOtp.verifyEmail({
            email,
            otp: value.otp,
          })

          if (error) {
            throw error
          }

          await navigate({
            to: "/",
            replace: true,
          })

          return { type: "signup" as const }
        }

        const { error } = await authClient.emailOtp.checkVerificationOtp({
          email,
          otp: value.otp,
          type: "forget-password",
        })

        if (error) {
          throw error
        }

        await navigate({
          to: "/reset-password",
          search: {
            email,
            otp: value.otp,
          },
          replace: true,
        })

        return { type: "forgot-password" as const }
      }

      await toast.promise(otpPromise(), {
        loading: "验证中...",
        success: (result) =>
          result.type === "signup" ? "验证成功。" : "请输入新密码。",
        error: "验证码错误或已过期，请重试。",
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
            <h1 className="text-xl font-bold">验证邮箱</h1>
            <FieldDescription>验证码已发送至 {email}</FieldDescription>
          </div>

          <form.Field name="otp">
            {(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>验证码</FieldLabel>

                <InputOTP
                  id={field.name}
                  name={field.name}
                  maxLength={6}
                  value={field.state.value}
                  onChange={field.handleChange}
                  onBlur={field.handleBlur}
                  pattern={REGEXP_ONLY_DIGITS}
                  aria-invalid={field.state.meta.errors.length > 0}
                  containerClassName="justify-center"
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>

          <Field>
            <form.Subscribe selector={(state) => state.isSubmitting}>
              {(isSubmitting) => (
                <Button type="submit" disabled={isSubmitting}>
                  验证
                </Button>
              )}
            </form.Subscribe>
          </Field>
        </FieldGroup>
      </form>
    </div>
  )
}
