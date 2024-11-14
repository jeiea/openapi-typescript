import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
export default function createClient(client, { prefixQueryKey } = {}) {
    const queryFn = async ({ queryKey: [, method, path, init], signal, }) => {
        const mth = method.toUpperCase();
        const fn = client[mth];
        const { data, error } = await fn(path, { signal, ...init });
        if (error) {
            throw error;
        }
        return data;
    };
    const queryOptions = (method, path, ...[init, options]) => ({
        queryKey: [prefixQueryKey, method, path, init],
        queryFn,
        ...options,
    });
    return {
        queryOptions,
        useQuery: (method, path, ...[init, options, queryClient]) => useQuery(queryOptions(method, path, init, options), queryClient),
        useSuspenseQuery: (method, path, ...[init, options, queryClient]) => useSuspenseQuery(queryOptions(method, path, init, options), queryClient),
        useMutation: (method, path, options, queryClient) => useMutation({
            mutationKey: [method, path],
            mutationFn: async (init) => {
                const mth = method.toUpperCase();
                const fn = client[mth];
                const { data, error } = await fn(path, init);
                if (error) {
                    throw error;
                }
                return data;
            },
            ...options,
        }, queryClient),
    };
}
//# sourceMappingURL=index.js.map