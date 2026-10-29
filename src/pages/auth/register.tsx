import {Button, Card, FieldError, Form, Input, Label, TextField, toast} from "@heroui/react";
import {usePostApiAuthRegister} from "#/gen/api";
import {toValidationErrors} from "#/lib/error.ts";
import {useState} from "react";
import {Link} from "#/components/link.tsx";

export function Register() {
    const [errors, setErrors] = useState<Record<string, string>>({})

    const register =  usePostApiAuthRegister({
        mutation:{
            onSuccess: async() =>{
                toast.success("注册成功!");
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

    function handleSubmit(formData: FormData) {
        const password = String(formData.get("password") ?? "")
        const confirmPassword = String(formData.get("confirmPassword") ?? "")

        if (password !== confirmPassword) {
            setErrors({
                confirmPassword: "两次输入的密码不一致",
            })
            return
        }

        setErrors({})

        register.mutate({
            data: {
                email: String(formData.get("email") ?? ""),
                name: String(formData.get("name") ?? ""),
                password,
            },
        })
    }


    return  <Card className="w-full max-w-md">
        <Card.Header>
            <Card.Title>注册</Card.Title>
            <Card.Description>输入账号信息以创建您的账户</Card.Description>
        </Card.Header>
        <Form onSubmit={e=>{
            e.preventDefault();
            void handleSubmit(new FormData(e.currentTarget));
        }} validationErrors={errors}>
            <Card.Content>
                <div className="flex flex-col gap-4">
                    <TextField name="name" type="name" isRequired>
                        <Label>用户名</Label>
                        <Input placeholder="name" variant="secondary" />
                        <FieldError />
                    </TextField>
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
                    <TextField name="confirmPassword" type="password" isRequired>
                        <Label>确认密码</Label>
                        <Input placeholder="••••••••" variant="secondary" />
                        <FieldError />
                    </TextField>
                </div>
            </Card.Content>
            <Card.Footer className="mt-4 flex flex-col gap-2">
                <Button className="w-full" type="submit"
                        isPending={register.isPending}
                        isDisabled={register.isPending}>
                    注册
                </Button>
                <Link className="text-center text-sm" to="/auth/login">
                    已经有账户了？
                </Link>
            </Card.Footer>
        </Form>
    </Card>
}