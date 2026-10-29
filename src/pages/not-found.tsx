import {Button, Card} from "@heroui/react"
import { useRouter } from "@tanstack/react-router"

export function NotFound() {
    const router = useRouter()

    return (
        <div className="flex min-h-screen items-center justify-center">
            <Card className="w-full max-w-md" variant="transparent">
                <Card.Header>
                    <Card.Title>页面未找到</Card.Title>
                    <Card.Description>
                        抱歉，您访问的页面不存在。
                    </Card.Description>
                </Card.Header>

                <Card.Footer className="mt-4 flex flex-col gap-2">
                    <Button
                        className="w-full"
                        variant="primary"
                        onPress={() => router.navigate({ to: "/" })}
                    >
                        返回首页
                    </Button>
                    <Button
                        className="w-full"
                        variant="secondary"
                        onPress={() => router.history.back()}
                    >
                        返回上一页
                    </Button>
                </Card.Footer>
            </Card>
        </div>
    )
}