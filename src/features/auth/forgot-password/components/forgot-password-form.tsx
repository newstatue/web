import { type HTMLAttributes, useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "@tanstack/react-router"
import { ArrowRight, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useForgotPasswordStore } from "@/stores/forgot-password-store.ts"
import { cloud } from "@/lib/cloudbase.tsx"
import { handleServerError } from "@/lib/handle-server-error.ts"
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

const formSchema = z.object({
  email: z.email({
    error: (iss) => (iss.input === "" ? "Please enter your email." : undefined),
  }),
})

export function ForgotPasswordForm({
  className,
  ...props
}: HTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  })

  const setUpdateUser = useForgotPasswordStore((state) => state.setUpdateUser)

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    toast.promise(
      async () => {
        const { data: d, error } = await cloud
          .auth()
          .resetPasswordForEmail(data.email)
        if (error) {
          throw error
        }
        if (!d?.updateUser) {
          throw new Error("未获取到密码重置验证方法。")
        }

        setUpdateUser(d.updateUser)

        form.reset()

        await navigate({
          to: "/otp",
        })

        return data.email
      },
      {
        loading: "发送邮件中...",
        success: (email) => {
          return `邮件已发送到 ${email}。`
        },
        error: (error) => {
          handleServerError(error)
          return "发送邮件失败。"
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
        <Button className="mt-2" disabled={isLoading}>
          继续
          {isLoading ? <Loader2 className="animate-spin" /> : <ArrowRight />}
        </Button>
      </form>
    </Form>
  )
}
