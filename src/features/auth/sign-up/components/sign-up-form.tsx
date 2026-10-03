import { type HTMLAttributes, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { Loader2, UserPlus } from "lucide-react"
import { toast } from "sonner"
import { authClient } from "@/lib/auth-client.ts"
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
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/password-input"

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

export function SignUpForm({
  className,
  ...props
}: HTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    toast.promise(
      async () => {
        const { error } = await authClient.signUp.email({
          name: data.email.split("@")[0],
          email: data.email,
          password: data.password,
        })

        if (error) {
          throw new Error("创建账户失败")
        }

        const { error: otpError } =
          await authClient.emailOtp.sendVerificationOtp({
            email: data.email,
            type: "email-verification",
          })

        if (otpError) {
          throw new Error("验证码发送失败")
        }

        await navigate({
          to: "/otp",
          search: {
            email: data.email,
            type: "signup",
          },
        })

        return data.email
      },
      {
        loading: "创建账户中...",
        success: (email) => `验证码已发送到 ${email}，请完成邮箱验证。`,
        error: (error) =>
          error instanceof Error ? error.message : "操作失败。",
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
        className={cn("grid gap-3", className)}
        {...props}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input placeholder="name@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>确认密码</FormLabel>
              <FormControl>
                <PasswordInput placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-2" disabled={isLoading}>
          {isLoading ? <Loader2 className="animate-spin" /> : <UserPlus />}
          创建
        </Button>
      </form>
    </Form>
  )
}
