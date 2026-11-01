import { setupWorker } from "msw/browser"
import { http, HttpResponse } from "msw"
import { getDefaultMock } from "#/gen/api/default/default.msw"
import { mockPosts } from "#/mocks/posts"


export const worker = setupWorker(
    // 帖子列表
    http.get("*/api/communities/:slug/posts", ({ request }) => {
        const url = new URL(request.url)

        const page = Math.max(
            1,
            Number(url.searchParams.get("page") || 1),
        )

        const limit = Math.max(
            1,
            Number(url.searchParams.get("limit") || 20),
        )

        return HttpResponse.json({
            items: mockPosts.slice(
                (page - 1) * limit,
                page * limit,
            ),
            total: mockPosts.length,
            page,
            limit,
        })
    }),

    // 帖子详情
    http.get("*/api/communities/:slug/posts/:postId", ({ params }) => {
            const post = mockPosts.find(
                (post) => post.id === params.postId,
            )

            if (!post) {
                return HttpResponse.json(
                    {
                        status: 404,
                        title: "Not Found",
                        detail: "帖子不存在",
                    },
                    { status: 404 },
                )
            }

            return HttpResponse.json(post)
        },
    ),

    // 其他接口仍然使用 Orval 自动生成的 Mock
    ...getDefaultMock(),
)