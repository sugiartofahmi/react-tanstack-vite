import { redirect } from "@tanstack/react-router";
import { match } from "ts-pattern";
import { canAll, canAny } from "./permissions.ts";
import type { TPermission } from "./permissions.ts";

type TRouteGuardContext = {
	context: {
		permissions: readonly TPermission[];
	};
};

type TCheckRoutePermissionsOptions = {
	permissions: readonly TPermission[];
	mode?: "all" | "any";
	redirectTo?: string;
};

export class ForbiddenError extends Error {
	readonly isForbidden = true;
	constructor(message = "Forbidden") {
		super(message);
		this.name = "ForbiddenError";
	}
}

export const isForbiddenError = (error: Error): error is ForbiddenError =>
	error instanceof ForbiddenError;

export const checkRoutePermissions =
	({ permissions, mode = "all", redirectTo }: TCheckRoutePermissionsOptions) =>
	({ context }: TRouteGuardContext): void => {
		const allowed = match(mode)
			.with("all", () => canAll(context.permissions, permissions))
			.with("any", () => canAny(context.permissions, permissions))
			.exhaustive();

		if (allowed) return;
		if (redirectTo) throw redirect({ to: redirectTo });
		throw new ForbiddenError();
	};
