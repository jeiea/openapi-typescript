import type { QueryClient, SkipToken, UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult, UseSuspenseQueryOptions, UseSuspenseQueryResult } from "@tanstack/react-query";
import type { Client as FetchClient, FetchResponse, MaybeOptionalInit } from "openapi-fetch";
import type { HttpMethod, MediaType, PathsWithMethod, RequiredKeysOf } from "openapi-typescript-helpers";
type InitWithUnknowns<Init> = Init & {
    [key: string]: unknown;
};
export type QueryKey<Prefix, Paths extends Record<string, Record<HttpMethod, {}>>, Method extends HttpMethod, Path extends PathsWithMethod<Paths, Method>> = readonly [Prefix, Method, Path, MaybeOptionalInit<Paths[Path], Method>];
export type QueryOptionsFunction<Paths extends Record<string, Record<HttpMethod, {}>>, Media extends MediaType, Prefix = unknown> = <Method extends HttpMethod, Path extends PathsWithMethod<Paths, Method>, Init extends MaybeOptionalInit<Paths[Path], Method>, Response extends Required<FetchResponse<Paths[Path][Method], Init, Media>>, Options extends Omit<UseQueryOptions<Response["data"], Response["error"], Response["data"], QueryKey<Prefix, Paths, Method, Path>>, "queryKey" | "queryFn">>(method: Method, path: Path, ...[init, options]: RequiredKeysOf<Init> extends never ? [InitWithUnknowns<Init>?, Options?] : [InitWithUnknowns<Init>, Options?]) => NoInfer<Omit<UseQueryOptions<Response["data"], Response["error"], Response["data"], QueryKey<Prefix, Paths, Method, Path>>, "queryFn"> & {
    queryFn: Exclude<UseQueryOptions<Response["data"], Response["error"], Response["data"], QueryKey<Prefix, Paths, Method, Path>>["queryFn"], SkipToken | undefined>;
}>;
export type UseQueryMethod<Paths extends Record<string, Record<HttpMethod, {}>>, Media extends MediaType, Prefix = unknown> = <Method extends HttpMethod, Path extends PathsWithMethod<Paths, Method>, Init extends MaybeOptionalInit<Paths[Path], Method>, Response extends Required<FetchResponse<Paths[Path][Method], Init, Media>>, Options extends Omit<UseQueryOptions<Response["data"], Response["error"], Response["data"], QueryKey<Prefix, Paths, Method, Path>>, "queryKey" | "queryFn">>(method: Method, url: Path, ...[init, options, queryClient]: RequiredKeysOf<Init> extends never ? [InitWithUnknowns<Init>?, Options?, QueryClient?] : [InitWithUnknowns<Init>, Options?, QueryClient?]) => UseQueryResult<Response["data"], Response["error"]>;
export type UseSuspenseQueryMethod<Paths extends Record<string, Record<HttpMethod, {}>>, Media extends MediaType, Prefix = unknown> = <Method extends HttpMethod, Path extends PathsWithMethod<Paths, Method>, Init extends MaybeOptionalInit<Paths[Path], Method>, Response extends Required<FetchResponse<Paths[Path][Method], Init, Media>>, Options extends Omit<UseSuspenseQueryOptions<Response["data"], Response["error"], Response["data"], QueryKey<Prefix, Paths, Method, Path>>, "queryKey" | "queryFn">>(method: Method, url: Path, ...[init, options, queryClient]: RequiredKeysOf<Init> extends never ? [InitWithUnknowns<Init>?, Options?, QueryClient?] : [InitWithUnknowns<Init>, Options?, QueryClient?]) => UseSuspenseQueryResult<Response["data"], Response["error"]>;
export type UseMutationMethod<Paths extends Record<string, Record<HttpMethod, {}>>, Media extends MediaType> = <Method extends HttpMethod, Path extends PathsWithMethod<Paths, Method>, Init extends MaybeOptionalInit<Paths[Path], Method>, Response extends Required<FetchResponse<Paths[Path][Method], Init, Media>>, Options extends Omit<UseMutationOptions<Response["data"], Response["error"], Init>, "mutationKey" | "mutationFn">>(method: Method, url: Path, options?: Options, queryClient?: QueryClient) => UseMutationResult<Response["data"], Response["error"], Init>;
export interface OpenapiQueryClient<Paths extends {}, Media extends MediaType = MediaType, Prefix = unknown> {
    queryOptions: QueryOptionsFunction<Paths, Media, Prefix>;
    useQuery: UseQueryMethod<Paths, Media, Prefix>;
    useSuspenseQuery: UseSuspenseQueryMethod<Paths, Media, Prefix>;
    useMutation: UseMutationMethod<Paths, Media>;
}
export default function createClient<Paths extends {}, Media extends MediaType = MediaType, Prefix = unknown>(client: FetchClient<Paths, Media>, { prefixQueryKey }?: {
    prefixQueryKey?: Prefix;
}): OpenapiQueryClient<Paths, Media, Prefix>;
export {};