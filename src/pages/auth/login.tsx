import {Button, Card, FieldError, Form, Input, Label, TextField, toast} from "@heroui/react";
import {usePostApiAuthLogin} from "#/gen/api";
import {toValidationErrors} from "#/lib/error.ts";
import {useState} from "react";
import {Link} from "#/components/link.tsx";

export function Login() {
    const [errors, setErrors] = useState<Record<string, string>>({})

    const login =  usePostApiAuthLogin({
        mutation:{
            onSuccess: async() =>{
                toast.success("登录成功!");
            },
            onError:(err)=>{
                if(err.status === 422){
                    setErrors(toValidationErrors(err.info?.errors))
                    return
                }
                toast.danger(err.info?.detail ?? err.message)
            }
        }
    })
    function handleSubmit(formData: FormData){
        login.mutate({
            data: {
                email:String(formData.get("email")??""),
                password:String(formData.get("password")??""),
            }
        })
    }


    return  <Card className="w-full max-w-md">
        <Card.Header>
            <Card.Title>登录</Card.Title>
            <Card.Description>输入账号信息以访问您的账户</Card.Description>
        </Card.Header>
        <Form onSubmit={e=>{
            e.preventDefault();
            void handleSubmit(new FormData(e.currentTarget));
        }} validationErrors={errors}>
            <Card.Content>
                <div className="flex flex-col gap-4">
                    <TextField name="email" type="email" isRequired>
                        <Label>邮箱</Label>
                        <Input placeholder="email@example.com" variant="secondary" />
                        <FieldError />
                    </TextField>
                    <TextField name="password" type="password" isRequired>
                        <Label>密码</Label>
                        <Input placeholder="••••••••" variant="secondary" />
                        <FieldError />
                    </TextField>
                    <Link className="text-center text-sm" to="/error/coming-soon">
                        忘记密码？
                    </Link>
                </div>
            </Card.Content>
            <Card.Footer className="mt-4 flex flex-col gap-2">
                <Button className="w-full" type="submit"
                        isPending={login.isPending}
                        isDisabled={login.isPending}>
                    登录
                </Button>
                <Link className="text-center text-sm" to="/auth/register">
                    还没有账户？ 注册
                </Link>
            </Card.Footer>
        </Form>
    </Card>
}