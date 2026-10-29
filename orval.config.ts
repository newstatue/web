import { defineConfig } from "orval"

export default defineConfig({
    api: {
        input: {
            target: "http://localhost:8080/api/openapi.json",
        },
        output: {
            mode: "tags-split",
            target: "src/gen/api/endpoints.ts",
            schemas: "src/gen/api/models",
            client: "react-query",
            httpClient: "fetch",
            override: {
                fetch: {
                    forceSuccessResponse: true,
                },
            },
        },
    },
    validation: {
        input: {
            target: "http://localhost:8080/api/openapi.json",
        },
        output: {
            mode: "tags-split",
            target: "src/gen/zod/schema.ts",
            client: "zod",
        },
    },
})