import { type HTMLAttributes, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { Loader2, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import { useSignUpStore } from '@/stores/sign-up-store.ts';
import { cloud } from '@/lib/cloudbase.tsx';
import { handleServerError } from '@/lib/handle-server-error.ts';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PasswordInput } from '@/components/password-input';




































































































































const formSchema = z
  .object({
    email: z.email({
      error: (iss) =>
        iss.input === '' ? '请输入邮箱。' : '请输入正确的邮箱地址。',
    }),
    password: z.string()
      .min(1, '请输入密码。')
      .min(8, '密码长度至少8位。'),
    confirmPassword: z.string().min(1, '请确认您的密码。'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不匹配。",
    path: ['confirmPassword'],
  })

export function SignUpForm({
  className,
  ...props
}: HTMLAttributes<HTMLFormElement>) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const setVerifyOtp = useSignUpStore((state)=>state.setVerifyOtp)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    toast.promise(
      async () => {
        const { data: d, error } = await cloud.auth().signUp({
          email: data.email,
          password: data.password,
        })

        if (error) {
          throw error
        }

        if (!d.verifyOtp) {
          throw new Error('未获取到验证码验证方法')
        }

        setVerifyOtp(d.verifyOtp)
        await navigate({
          to:"/otp",
        })

        return data.email
      },
      {
        loading: '创建账户中...',
        success: (email) => {
          return `账户 ${email} 创建成功。`
        },
        error: (error) => {
          handleServerError(error)
          return '创建账户失败。'
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
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>邮箱</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>密码</FormLabel>
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
              <FormLabel>确认密码</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? <Loader2 className='animate-spin' /> : <UserPlus />}
          创建
        </Button>
      </form>
    </Form>
  )
}
