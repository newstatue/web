import {useGetApiAuthMe} from "#/gen/api";

export function useAuth() {
    const query = useGetApiAuthMe({
        query: {
            retry: false,
            staleTime: 60_000,
        },
    })

    return {
        user: query.data?.data,
        isAuthenticated: query.isSuccess,
        isLoading: query.isPending,
    }
}