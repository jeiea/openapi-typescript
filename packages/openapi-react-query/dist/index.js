import { useMutation, useQuery, useSuspenseQuery } from "@tanstack/react-query";
const clientIds = new WeakMap();
let lastId = 0;
export default function createClient(client) {
    const clientId = clientIds.get(client) ?? lastId++;
    clientIds.set(client, clientId);
    const queryFn = async ({ queryKey: [_clientId, method, path, init], signal, }) => {
        const mth = method.toUpperCase();
        const fn = client[mth];
        const { data, error } = await fn(path, { signal, ...init });
        if (error || !data) {
            throw error;
        }
        return data;
    };
    const queryOptions = (method, path, ...[init, options]) => ({
        queryKey: [clientId, method, path, init],
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
                if (error || !data) {
                    throw error;
                }
                return data;
            },
            ...options,
        }, queryClient),
    };
}
//# sourceMappingURL=index.js.map