import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";
import { PERMISSION } from "#/libs/permissions/permissions.ts";
import type { TPermission } from "#/libs/permissions/permissions.ts";

export const userSchema = z.object({
	id: z.string(),
	email: z.string(),
	name: z.string(),
});

export const meResponseSchema = z.object({
	user: userSchema,
	permissions: z.array(z.string()),
});

export type TUser = z.infer<typeof userSchema>;

export type TMeResponse = {
	user: TUser;
	permissions: readonly TPermission[];
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const fetchMe = async (): Promise<TMeResponse> => {
	// TODO real call:
	// const { data } = await api.get("/auth/me");
	// const parsed = meResponseSchema.parse(data);
	// return { user: parsed.user, permissions: parsed.permissions as readonly TPermission[] };

	await delay(100);
	return {
		user: {
			id: "1",
			email: "demo@example.com",
			name: "Demo User",
		},
		permissions: [PERMISSION.DASHBOARD_READ],
	};
};

export const ME_QUERY_KEY = ["auth", "me"] as const;

export const meQueryOptions = () =>
	queryOptions({
		queryKey: ME_QUERY_KEY,
		queryFn: fetchMe,
		staleTime: 30_000,
	});
