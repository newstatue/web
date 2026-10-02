import { type HTMLAttributes, useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import { useForgotPasswordStore } from '@/stores/forgot-password-store.ts'
import { handleServerError } from '@/lib/handle-server-error.ts'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PasswordInput } from '@/components/password-input'

const formSchema = z
  .object({
    password: z.string().min(1, '请输入新密码。').min(8, '密码长度至少8位。'),

    confirmPassword: z.string().min(1, '请再次输入新密码。'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '两次输入的密码不一致。',
    path: ['confirmPassword'],
  })

type ResetPasswordFormProps = HTMLAttributes<HTMLFormElement>

export function ResetPasswordForm({
  className,
  ...props
}: ResetPasswordFormProps) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  const updateUser = useForgotPasswordStore((state) => state.updateUser)
  const otp = useForgotPasswordStore((state) => state.otp)
  const clear = useForgotPasswordStore((state) => state.clear)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    toast.promise(
      async () => {
        if (!updateUser || !otp) {
          throw new Error('密码重置会话已失效，请重新获取验证码。')
        }

        const result = await updateUser({
          nonce: otp,
          password: data.password,
        })

        clear()

        await navigate({
          to: '/sign-in',
          replace: true,
        })

        return result
      },
      {
        loading: '正在重置密码...',
        success: '密码重置成功，请使用新密码登录。',
        error: (error) => {
          handleServerError(error)
          return '密码重置失败，请重试。'
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
        className={cn('grid gap-2', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>新密码</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem>
              <FormLabel>确认新密码</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className='mt-2' disabled={isLoading}>
          重置密码
          {isLoading ? <Loader2 className='animate-spin' /> : <ArrowRight />}
        </Button>
      </form>
    </Form>
  )
}
