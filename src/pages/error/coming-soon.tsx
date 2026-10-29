import { useRouter } from "@tanstack/react-router"
import { Button, Card } from "@heroui/react"

export function ComingSoon() {
    const router = useRouter()

    return (
        <Card className="w-full max-w-md" variant="transparent">
            <Card.Header>
                <Card.Title>功能开发中</Card.Title>
                <Card.Description>
                    该功能正在开发中，敬请期待。
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
    )
}