import { A } from "@mobily/ts-belt";

export const PERMISSION = {
	DASHBOARD_READ: "dashboard:read",
	USER_MANAGE: "user:manage",
} as const;

export type TPermission =
	| (typeof PERMISSION)[keyof typeof PERMISSION]
	| (string & {});

export const canAll = (
	granted: readonly TPermission[],
	required: readonly TPermission[],
): boolean => A.every(required, (p) => A.includes(granted, p));

export const canAny = (
	granted: readonly TPermission[],
	required: readonly TPermission[],
): boolean => A.some(required, (p) => A.includes(granted, p));
