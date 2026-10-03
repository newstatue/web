import { type HTMLAttributes, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { Route } from "@/routes/(auth)/otp.tsx"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client.ts"
import { handleServerError } from "@/lib/handle-server-error.ts"
import { showSubmittedData } from "@/lib/show-submitted-data"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"

const formSchema = z.object({
  otp: z
    .string()
    .min(6, "请输入六位数字验证码。")
    .max(6, "请输入六位数字验证码。"),
})

type OtpFormProps = HTMLAttributes<HTMLFormElement>

export function OtpForm({ className, ...props }: OtpFormProps) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { otp: "" },
  })

  // eslint-disable-next-line react-hooks/incompatible-library
  const otp = form.watch("otp")

  const { email, type } = Route.useSearch()

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)
    showSubmittedData(data)
    toast.promise(
      async () => {
        if (type === "signup") {
          const { error } = await authClient.emailOtp.verifyEmail({
            email,
            otp: data.otp,
          })

          if (error) {
            throw error
          }

          await navigate({
            to: "/",
            replace: true,
          })

          return {
            type: "signup" as const,
          }
        }

        if (type === "forgot-password") {
          const { error } = await authClient.emailOtp.checkVerificationOtp({
            email,
            otp: data.otp,
            type: "forget-password",
          })

          if (error) {
            throw error
          }

          await navigate({
            to: "/reset-password",
            search: {
              email,
              otp: data.otp,
            },
            replace: true,
          })

          return {
            type: "forgot-password" as const,
          }
        }

        throw new Error("验证码会话已失效，请重新获取验证码。")
      },
      {
        loading: "验证中...",
        success: (result) => {
          if (result.type === "signup") {
            return "验证成功。"
          }

          return "请输入新密码。"
        },
        error: (error) => {
          handleServerError(error)
          return "操作失败，请重试。"
        },
        finally: () => {
          setIsLoading(false)
        },
      }
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("grid gap-2", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">One-Time Password</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  {...field}
                  containerClassName='justify-between sm:[&>[data-slot="input-otp-group"]>div]:w-12'
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={otp.length < 6 || isLoading}>
          验证
        </Button>
      </form>
    </Form>
  )
}
