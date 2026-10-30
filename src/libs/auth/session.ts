import type { QueryClient } from "@tanstack/react-query";
import { cookies } from "./cookies.ts";
import { meQueryOptions } from "./me.ts";
import type { TMeResponse, TUser } from "./me.ts";
import type { TPermission } from "#/libs/permissions/permissions.ts";

export type TSession = {
	user: TUser;
	token: string;
};

export type TSessionResolution = {
	session: TSession | null;
	permissions: readonly TPermission[];
};

export class ServerUnreachableError extends Error {
	constructor(message = "The server could not be reached") {
		super(message);
		this.name = "ServerUnreachableError";
	}
}

export const isServerUnreachable = (error: Error): boolean =>
	error instanceof ServerUnreachableError;

export const resolveSession = async (
	queryClient: QueryClient,
): Promise<TSessionResolution> => {
	const token = cookies.getAccessToken();
	if (!token) {
		return { session: null, permissions: [] };
	}

	try {
		const meData: TMeResponse = await queryClient.ensureQueryData(
			meQueryOptions(),
		);
		return {
			session: {
				user: meData.user,
				token,
			},
			permissions: meData.permissions,
		};
	} catch {
		cookies.clearAccessToken();
		return { session: null, permissions: [] };
	}
};
